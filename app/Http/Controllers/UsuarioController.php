<?php

namespace App\Http\Controllers;

use App\Models\Escuela;
use App\Models\EscuelaPedido;
use App\Models\EscuelaUsuario;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use App\Models\EscuelaDetallePedido;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class UsuarioController extends Controller
{
    /*
        Descripción: función que muestra la pantalla de inicio de sesión.
        Page: resources/views/user/login
        Route name: user.login
        Route URL: /login
        Paramétros:
        Modelos:
        Retorna:
    */
    public function login()
    {
        return view('user.login');
    }

    /*
        Descripción: función para inicio de sesión.
        Page: resources/views/user/login
        Route name: user.postlogin
        Route URL: /postlogin
        Paramétros: $request
        Modelos: EscuelaUsuario
        Retorna: $notificacion
    */
    public function postlogin(LoginRequest $request)
    {
        if (!$request->has('buttonlogin') && $request->buttonlogin = "login") {
            //Si los datos del usuarios no son correctos
            $notificacion = array(
                'message' => 'Formulario de inicio de sesión incorrecto',
                'alert-type' => 'error'
            );

            return Redirect::route('user.login')
                ->with($notificacion);
        }

        if (Auth::attempt(['usuario' => $request->usuario, 'password' => $request->password], $request->remember_me)) {
            //Verificamos si el usuario se encuentra activo, si en caso no estuviera activo lo mandos al login.
            if (is_null(EscuelaUsuario::where('usuario', $request->usuario)->where('activo', true)->first())) {
                Auth::logout();

                $notificacion = array(
                    'message' => 'El usuario se encuentra inactivo, comunicarse con soporte técnico.',
                    'alert-type' => 'info'
                );

                return Redirect::route('user.login')
                    ->with($notificacion);
            }

            //Si el usuario inicia sesión guardamos datos para la compra del carrito
            if (Session::has('oldUrl')) {
                $oldUrl = Session::get('oldUrl');
                Session::forget('oldUrl');
                return Redirect::to($oldUrl);
            }

            return Redirect::route('consulta.index');
        } else {
            //Si los datos del usuarios no son correctos
            $notificacion = array(
                'message' => 'Usuario o contraseña incorrectos',
                'alert-type' => 'error'
            );

            return Redirect::route('user.login')
                ->with($notificacion);
        }
    }

    /*
        Descripción: función para mostrar la información del usuario logueado en la página.
        Page: resources/views/user/perfil
        Route name: user.perfil
        Route URL: /perfil
        Paramétros:
        Modelos: EscuelaPedido
        Retorna: $pedidos
    */
    public function perfil()
    {
        $pedidos = EscuelaPedido::where('escuela_id', Auth::user()->escuela_id)->orderBy('id', 'DESC')->get();

        return view('user.perfil', compact('pedidos'));
    }

    /*
        Descripción: función para mostrar la información del pedido seleccionado.
        Page: resources/views/user/detalle_pedido
        Route name: user.detalle_pedido
        Route URL: /perfil/pedido/{numero}/detalle
        Paramétros: $numero
        Modelos: EscuelaPedido, EscuelaDetallePedido
        Retorna: $pedido, $detalles
    */
    public function detalle_pedido(EscuelaPedido $numero)
    {
        $pedido = $numero;
        $detalles = EscuelaDetallePedido::where('escuela_pedido_id', $pedido->id)->get();
        $usuario = Auth::user();
        $escuela = Escuela::find($usuario->escuela_id);

        return view('user.detalle_pedido', compact('pedido', 'detalles', 'usuario', 'escuela'));
    }

    /*
        Descripción: función para cancelar el pedido seleccionado.
        Page: resources/views/user/perfil
        Route name: user.cancelar
        Route URL: /perfil/pedido/{numero}/cancelar
        Paramétros: $numero
        Modelos: EscuelaPedido
        Retorna: $pedido, $detalles
    */
    public function cancelar(EscuelaPedido $numero)
    {
        try {
            DB::beginTransaction();

            $numero->estado_pedido_id = 6;
            $numero->save();

            EscuelaDetallePedido::where('escuela_pedido_id', $numero->id)->update(['activo' => false]);

            $this->historialPedido(1, 6, $numero->id);

            DB::commit();

            $notificacion = array(
                'message' => "El pedido número {$numero->id} fue cancelado.",
                'alert-type' => 'success'
            );
        } catch (\Throwable $th) {
            $notificacion = array(
                'message' => "Ocurrio un problema al cancelar el pedido número {$numero->id}",
                'alert-type' => 'error'
            );
        }

        return redirect()->route('user.perfil')->with($notificacion);
    }

    /*
        Descripción: función para terminar la sesión del usuario.
        Page: resources/views/shop/index
        Route name: user.logout
        Route URL: /logout
        Paramétros:
        Modelos:
        Retorna:
    */
    public function logout()
    {
        Auth::logout();
        return Redirect::route('consulta.index');
    }

    public function pdf($numero)
    {
        $pdf = PDF::loadView('pdf.factura', compact('pedido', 'detalles', 'company', 'credito', 'tipo_credito'));
        return $pdf->stream('factura.pdf');
    }
}
