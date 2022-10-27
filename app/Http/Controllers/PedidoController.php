<?php

namespace App\Http\Controllers;

use App\Cart;
use App\Models\Escuela;
use App\Models\EscuelaPedido;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PedidoRequest;
use App\Models\EscuelaDetallePedido;
use App\Models\ProductoVariante;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PedidoController extends Controller
{
    /*
        Descripción: función que muestra la información del pedido a realizar.
        Page: resources/views/shop/pedido
        Route name: pedido.index
        Route URL: /pedido
        Paramétros: Session
        Modelos: Cart
        Retorna: $cart, $total, $formato_total
    */
    public function index()
    {
        if (!Session::has('cart'))
            return redirect()->route('carrito.index');

        $oldCart = Session::get('cart');
        if (count($oldCart->productos) === 0) {
            $notificacion = array(
                'message' => "No hay información para registrar el pedido.",
                'alert-type' => 'error'
            );

            return redirect()->route('consulta.index')->with($notificacion);
        }

        $carro = new Cart($oldCart);

        $carrito = $carro->productos;
        $total = $carro->total;
        $usuario = Auth::user();
        $escuela = Escuela::find($usuario->escuela_id);

        return view('shop.pedido', compact('carrito', 'total', 'usuario', 'escuela'));
    }

    /*
        Descripción: función para registrar el pedido.
        Page: resources/views/shop/pedido
        Route name: pedido.realizar
        Route URL: /realizar/pedido
        Paramétros: $request
        Modelos: Session, Cart, Order, Product, Detail
        Retorna: $notificacion
    */
    public function realizar(PedidoRequest $request)
    {
        try {
            if (!Session::has('cart'))
                return redirect()->route('carrito.index');

            $oldCart = Session::get('cart');
            $carro = new Cart($oldCart);

            if (empty($carro->productos)) {
                $notificacion = array(
                    'message' => "No hay información para registrar el pedido.",
                    'alert-type' => 'error'
                );

                return redirect()->route('consulta.index')->with($notificacion);
            }

            DB::beginTransaction();

            $usuario = Auth::user();

            $pedido = EscuelaPedido::create(
                [
                    'pagado' => false,
                    'fecha_pedido' => date('Y-m-d'),
                    'fecha_entrega' => date('Y-m-d', strtotime($request->fecha_entrega)),
                    'sub_total' => $carro->total + $carro->descuento,
                    'descuento' => $carro->descuento,
                    'total' => $carro->total,
                    'anio' => date('Y'),
                    'descripcion' => $request->descripcion,
                    'escuela_usuario_id' => $usuario->id,
                    'escuela_id' => $usuario->escuela_id,
                    'estado_pedido_id' => 1,
                    'mes_id' => date('m')
                ]
            );

            foreach ($carro->productos as $articulo) {
                $existe = ProductoVariante::where('id', $articulo['producto_variante_id'])->where('activo', true)->first();

                if(is_null($existe)) {
                    throw new Exception("El producto {$articulo['nombre_completo']} ya no se encuentra disponible con este precio Q {$articulo['precio_real']}.", 1000);
                }

                EscuelaDetallePedido::create(
                    [
                        'cantidad' => $articulo['cantidad'],
                        'precio_real' => $articulo['precio_real'],
                        'precio_descuento' => $articulo['precio_descuento'],
                        'descuento' => $articulo['descuento'],
                        'sub_total' => $articulo['sub_total'],
                        'anio' => $pedido->anio,
                        'activo' => true,
                        'escuela_pedido_id' => $pedido->id,
                        'escuela_id' => $pedido->escuela_id,
                        'producto_variante_id' => $articulo['producto_variante_id'],
                        'producto_id' => $articulo['producto_id'],
                        'variante_presentacion_id' => $articulo['variante_presentacion_id'],
                        'variante_id' => $articulo['variante_id'],
                        'presentacion_id' => $articulo['presentacion_id'],
                        'mes_id' => $pedido->mes_id
                    ]
                );
            }

            $this->historialPedido(1, 1, $pedido->id);

            DB::commit();

            Session::forget('cart');
            $notificacion = array(
                'message' => 'Su pedido ha sido realizada, el número de pedido es ' . $pedido->id,
                'alert-type' => 'success'
            );

            return redirect()->route('user.perfil')->with($notificacion);
        } catch (\Exception $e) {
            DB::rollback();
            if($e->getCode() == 1000) {
                $notificacion = array(
                    'message' => $e->getMessage(),
                    'alert-type' => 'warning'
                );

                return redirect()->route('pedido.index')->with($notificacion);
            } else {
                return redirect()->route('pedido.index')->with('error', $e->getMessage());
            }
        }
    }
}
