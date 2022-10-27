<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Categoria;
use App\Models\SubCategoria;
use Illuminate\Http\Request;
use App\Models\Configuracion;
use App\Models\ProductoVariante;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ConsultaController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /*
        Descripción: función que muestra información de ofertas, productos y categorías en la vista index.
        Page: resources/views/shop/index
        Route name: consulta.index
        Route URL: /
        Paramétros:
        Modelos: Producto, ProductoVariante, Categoria
        Retorna: $ofertas, $productos, $categorias
    */
    public function index()
    {
        $ofertas = Producto::where('nuevo', true)->get();
        $productos = $this->productoQuery(is_null(Auth::user()) ? 0 : Auth::user()->escuela_id, 'ConsultaController.index');
        $categorias = Categoria::with(['sub_categorias:id,nombre,categoria_id'])->get();
        $categorias_random = Categoria::with(['sub_categorias:id,nombre,categoria_id'])
            ->whereExists(
                function ($query) {
                    $query->select(DB::raw(1))
                        ->from('sub_categoria')
                        ->join('producto_subcategoria', 'sub_categoria.id', 'producto_subcategoria.sub_categoria_id')
                        ->join('producto', 'producto_subcategoria.producto_id', 'producto.id')
                        ->where('producto.activo', true)
                        ->whereExists(
                            function ($subquery) {
                                $subquery->select(DB::raw(1))
                                    ->from('producto_variante')
                                    ->where('producto_variante.activo', true)
                                    ->whereRaw('producto_variante.producto_id = producto.id');
                            }
                        )
                        ->whereRaw('categoria.id = sub_categoria.categoria_id');
                }
            )
            ->inRandomOrder()
            ->limit(5)
            ->get();

        return view('shop.index', compact('ofertas', 'productos', 'categorias', 'categorias_random'));
    }

    /*
        Descripción: función que muestra información de productos y categorías en la vista productos.
        Page: resources/views/shop/productos
        Route name: consulta.productos
        Route URL: /productos
        Paramétros:
        Modelos: ProductoVariante, Category
        Retorna: $productos, $categorias
    */
    public function productos()
    {
        $productos = $this->productoQuery(is_null(Auth::user()) ? 0 : Auth::user()->escuela_id, 'ConsultaController.productos');
        $categorias = Categoria::with(['sub_categorias:id,nombre,categoria_id'])->get();

        return view('shop.productos', compact('productos', 'categorias'));
    }

    /*
        Descripción: función que muestra información del producto seleccionado y las categorías en la vista detalle.
        Page: resources/views/shop/detalle
        Route name: consulta.detalle
        Route URL: /producto/{producto}/detalle
        Paramétros: $product->id
        Modelos: ProductoVariante, Categoria
        Retorna: $producto, $categorias
    */
    public function detalle(ProductoVariante $producto)
    {
        $categorias = Categoria::with(['sub_categorias:id,nombre,categoria_id'])->get();
        $producto = $this->productoQuery(is_null(Auth::user()) ? 0 : Auth::user()->escuela_id, 'ConsultaController.detalle', $producto->producto_id);

        if(is_null($producto)) {
            return view('errors.404');
        }

        return view('shop.detalle', compact('producto', 'categorias'));
    }

    /*
        Descripción: función que muestra información de los productos que pertenecen a la sub categoría seleccionada en la vista sub_categoria.
        Page: resources/views/shop/sub_categoria
        Route name: consulta.sub_categoria
        Route URL: /sub_categoria/{sub_categoria}/productos
        Paramétros: $sub_categoria->id
        Modelos: SubCategoria, Categoria
        Retorna: $categorias, $nombre_sub_categoria, $productos
    */
    public function sub_categoria(SubCategoria $sub_categoria)
    {
        $categorias = Categoria::with(['sub_categorias:id,nombre,categoria_id'])->get();
        $nombre_sub_categoria = $sub_categoria->getCategoryAttribute();
        $productos = $this->productoQuery(is_null(Auth::user()) ? 0 : Auth::user()->escuela_id, 'ConsultaController.sub_categoria', $sub_categoria->id);

        return view('shop.sub_categoria', compact('categorias', 'nombre_sub_categoria', 'productos'));
    }

    /*
        Descripción: función para buscar productos.
        Page: resources/views/shop/buscar
        Route name: consulta.buscar
        Route URL: /buscar/producto
        Paramétros: $request
        Modelos: Product
        Retorna: $productos
    */
    public function buscar(Request $request)
    {
        $productos = $this->productoQuery(is_null(Auth::user()) ? 0 : Auth::user()->escuela_id, 'ConsultaController.buscar', 0, $request->search);

        return view('shop.buscar', compact('productos'));
    }

    /*
        Descripción: función que muestra la pantalla de empresa.
        Page: resources/views/shop/empresa
        Route name: consulta.empresa
        Route URL: /empresa
        Paramétros:
        Modelos: Configuracion
        Retorna: $empresa
    */
    public function empresa()
    {
        $empresa = Configuracion::where('pagina', true)->first();

        if (is_null($empresa)) {
            $notificacion = array(
                'message' => 'No hay información de la empresa.',
                'alert-type' => 'info'
            );

            return Redirect::route('consulta.index')
                ->with($notificacion);
        }

        return view('shop.empresa', compact('empresa'));
    }

    /*
        Descripción: función que muestra la pantalla de contacto.
        Page: resources/views/shop/contacto
        Route name: consulta.contacto
        Route URL: /contacto
        Paramétros:
        Modelos: Configuracion
        Retorna: $contacto
    */
    public function contacto()
    {
        $contacto = Configuracion::where('pagina', true)->first();

        if (is_null($contacto)) {
            $notificacion = array(
                'message' => 'No hay información de la empresa.',
                'alert-type' => 'info'
            );

            return Redirect::route('consulta.index')
                ->with($notificacion);
        }

        return view('shop.contacto', compact('contacto'));
    }
}
