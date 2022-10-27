<div class="category-tab">
    @foreach($categorias_random as $categoria)
    <div class="well well-lg" style="background: #f0f0e9;">
        <h1 class="text-center">{{ $categoria->nombre }} <span class="badge">{{ $categorias->reverse()->take(2)->count()
                }} sub categorías</span></h1>
        <div class="row">
            @foreach($categoria->sub_categorias->reverse()->take(2) as $sub_categoria)
            <div class="col-sm-12">
                <h3>{{$sub_categoria->nombre}} <span class="badge">{{ $sub_categoria->productos->take(8)->count() }}
                        productos</span></h3>
            </div>
            @foreach($sub_categoria->productos->take(8) as $item)
            @php
            $producto_variante = !is_null($item->producto) ? $item->producto->producto_variante->filter(function($item) {
            return $item->activo;
            })->first() : null;
            $escuela_id = is_null(Auth::user()) ? 0 : Auth::user()->escuela_id;
            $escuela = !is_null($producto_variante) ? $producto_variante->descuentos->filter(function($item) use ($escuela_id) {
            return ($item->activo && $escuela_id == $item->escuela_id);
            })->first() : null;
            @endphp
            <div class="col-sm-3">
                <div class="product-image-wrapper">
                    <span
                        class="{{ $item->producto->nuevo ? 'label label-success pull-right' : 'label label-warning pull-right' }}">
                        {{
                        $item->producto->getStringNewProductAttribute() }}</span>

                    @if ($item->producto->temporada)
                    <span class="label label-info pull-right">TEMPORADA</span>
                    @endif

                    <div class="single-products">
                        <div class="productinfo text-center">
                            <img class="lazyload" data-src="{{ $item->producto->getPictureAttribute() }}"
                                alt="{{ $item->producto->nombre }}" height="250px" />
                            <h2>{{ is_null($escuela) ? "Q ".number_format($producto_variante->precio,2) :
                                "Q ".number_format($escuela->precio,2) }}</h2>
                            <p>{{$item->producto->nombre}}</p>

                            <!-- Aquí va el botón -->
                            @if(Auth::check())
                            <a title="Agregar al carrito"
                                href="{{route('carrito.agregar_inmediatamente',['producto' => $producto_variante->id])}}"
                                class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Agregar al
                                carro</a>
                            @endif
                        </div>
                    </div>
                    <div class="choose">
                        <a title="Ver el detalle del producto"
                            href="{{route('consulta.detalle',['producto' => $item->producto->id])}}"
                            class="btn btn-info btn-block">Ver detalle</a>
                    </div>
                </div>
            </div>
            @endforeach
            <hr>
            @endforeach
        </div>
    </div>
    @endforeach
</div>
