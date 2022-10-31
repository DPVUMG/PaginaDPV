<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\ComentarioProducto;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ComentarioGeneralRequest;
use App\Http\Requests\ComentarioProductoRequest;
use App\Models\ProductoVariante;

class ComentariosController extends Controller
{
    /*
        Descripción: función que muestra la pantalla de comentarios.
        Page: resources/views/shop/comentarios
        Route name: comentario_general.index
        Route URL: /comentarios
        Paramétros:
        Modelos: Comentario
        Retorna: $comentarios
    */
    public function comentario_general_index()
    {
        $comentarios = Comentario::where('escuela_usuario_id', Auth::user() == null ? 0 : Auth::user()->id)->orderBy('id', 'DESC')->paginate(20);
        return view('shop.comentarios', compact('comentarios'));
    }

    /*
        Descripción: función para crear un nuevo comentario.
        Page: resources/views/shop/comentarios
        Route name: comentario_general.nuevo
        Route URL: /comentario/general/nuevo
        Paramétros: $request
        Modelos: Comentario
        Retorna: $notificacion
    */
    public function comentario_general_nuevo(ComentarioGeneralRequest $request)
    {
        $comentario = new Comentario();
        $comentario->comment = $request->comment;
        $comentario->escuela_usuario_id = Auth::user()->id;
        $comentario->save();

        $notificacion = array(
            'message' => 'Comentario creado.',
            'alert-type' => 'success'
        );

        return redirect()->route('comentario_general.index')->with($notificacion);
    }

    /*
        Descripción: función para eliminar un comentario.
        Page: resources/views/shop/comentarios
        Route name: comentario_general.eliminar
        Route URL: /comentario/general/eliminar/{id}
        Paramétros: $id
        Modelos: Comentario
        Retorna: $notificacion
    */
    public function comentario_general_eliminar(Comentario $id)
    {
        $id->delete();

        $notificacion = array(
            'message' => 'Comentario eliminado.',
            'alert-type' => 'success'
        );

        return redirect()->route('comentario_general.index')->with($notificacion);
    }

    /*
        Descripción: función para crear un nuevo comentario en el producto.
        Page: resources/views/shop/detalle
        Route name: comentario_producto.nuevo
        Route URL: /comentario/producto/nuevo
        Paramétros: $request
        Modelos: ComentarioProducto
        Retorna: $notificacion
    */
    public function comentario_producto_nuevo(ComentarioProductoRequest $request)
    {
        $comentario = new ComentarioProducto();
        $comentario->comment = $request->comment;
        $comentario->producto_id = $request->product_id;
        $comentario->escuela_usuario_id = Auth::user()->id;
        $comentario->save();

        $notificacion = array(
            'message' => 'Comentario creado.',
            'alert-type' => 'success'
        );

        return redirect()->route('consulta.detalle', ['producto' => $request->producto_variante_id])->with($notificacion);
    }

    /*
        Descripción: función para eliminar un comentario del producto.
        Page: resources/views/shop/detalle
        Route name: comentario_producto.eliminar
        Route URL: /comentario/producto/eliminar/{id}
        Paramétros: $id
        Modelos: ComentarioProducto
        Retorna: $notificacion
    */
    public function comentario_producto_eliminar(ComentarioProducto $id)
    {
        $id->delete();
        $presentacion = ProductoVariante::where('producto_id', $id->producto_id)->where('activo', true)->first();

        $notificacion = array(
            'message' => 'Comentario eliminado.',
            'alert-type' => 'success'
        );

        return redirect()->route('consulta.detalle', ['producto' => $presentacion->id])->with($notificacion);
    }
}
