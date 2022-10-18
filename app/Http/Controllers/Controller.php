<?php

namespace App\Http\Controllers;

use App\Models\EstadoPedido;
use App\Models\ProductoVariante;
use App\Models\EscuelaPedidoHistorial;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function productoQuery(int $escuela_id, string $consulta, int $id = 0, string $search = '')
    {
        switch ($consulta) {
            case 'ConsultaController.index':
                $informacion = ProductoVariante::consulta($escuela_id)
                    ->where('producto_variante.activo', true)
                    ->where('producto.activo', true)
                    ->orderBy('producto_variante.created_at', 'DESC')
                    ->take(6)
                    ->get();
                break;

            case 'ConsultaController.productos':
                $informacion = ProductoVariante::consulta($escuela_id)
                    ->where('producto_variante.activo', true)
                    ->where('producto.activo', true)
                    ->orderBy('producto_variante.created_at', 'DESC')
                    ->paginate(12);
                break;

            case 'ConsultaController.detalle':
                $informacion = ProductoVariante::consulta($escuela_id)
                    ->where('producto_variante.id', $id)
                    ->first();
                break;

            case 'ConsultaController.sub_categoria':
                $informacion = ProductoVariante::consulta($escuela_id)
                    ->join('producto_subcategoria', 'producto_subcategoria.producto_id', 'producto.id')
                    ->where('producto_variante.activo', true)
                    ->where('producto.activo', true)
                    ->where('producto_subcategoria.sub_categoria_id', $id)
                    ->orderBy('producto_variante.created_at', 'DESC')
                    ->paginate(12);
                break;

            case 'ConsultaController.buscar':
                $informacion = ProductoVariante::search($search)
                    ->consulta($escuela_id)
                    ->where('producto_variante.activo', true)
                    ->where('producto.activo', true)
                    ->paginate(10);
                break;
        }

        return $informacion;
    }

    public function historialPedido(int $estado_anterior, int $estado_actual, int $escuela_pedido_id, string $descripcion = null)
    {
        if (is_null($descripcion)) {
            switch ($estado_actual) {
                case 1:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue ingresado.";
                    break;
                case 2:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue confirmado.";
                    break;
                case 3:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue entregado.";
                    break;
                case 4:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue pagado.";
                    break;
                case 5:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue anulado.";
                    break;
                case 6:
                    $descripcion = "El pedido con número {$escuela_pedido_id} fue cancelado.";
                    break;
            }
        }

        EscuelaPedidoHistorial::create(
            [
                'estado_anterior' => EstadoPedido::find($estado_anterior)->nombre,
                'estado_actual' => EstadoPedido::find($estado_actual)->nombre,
                'descripcion' => $descripcion,
                'usuario' => Auth::user()->usuario,
                'escuela_id' => Auth::user()->escuela_id,
                'estado_pedido_id' => $estado_actual,
                'escuela_pedido_id' => $escuela_pedido_id
            ]
        );
    }
}
