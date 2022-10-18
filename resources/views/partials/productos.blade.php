@foreach($productos->chunk(3) as $bloque_productos)
@foreach($bloque_productos as $producto)
<div class="col-sm-4">
    <div class="product-image-wrapper">
        <div class="single-products">
            <div class="productinfo text-center">
                <img class="lazyload"
                    data-src="{{ $producto->getPictureAttribute($producto->producto_id, is_null($producto->producto_foto) ? '' : $producto->producto_foto ) }}"
                    alt="{{ $producto->producto_nombre }}" height="250px" />
                <h2>{{ is_null($producto->escuela_precio) ? $producto->producto_precio : $producto->escuela_precio }}
                </h2>
                <p>{{$producto->producto_nombre}}</p>
            </div>
            <div class="product-overlay">
                <div class="overlay-content">
                    <h2>{{ is_null($producto->escuela_precio) ? $producto->producto_precio : $producto->escuela_precio
                        }}</h2>
                    <p>{!! $producto->producto_descripcion !!}</p>
                    <p>{{ $producto->variante_nombre }} / {{ $producto->presentacion_nombre }}</p>

                    <!-- Botón que hace la magia -->
                    @if(Auth::check())
                    <a title="Agregar al carrito"
                        href="{{route('carrito.agregar_inmediatamente',['producto' => $producto->producto_variante_id])}}"
                        class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Agregar al carro</a>
                    @endif
                </div>

                <span
                    class="{{ $producto->producto_nuevo == 1 ? 'label label-success pull-right' : 'label label-warning pull-right' }}">{{
                    $producto->getStringNewProductAttribute($producto->producto_nuevo) }}</span>

                @if ($producto->producto_temporada == 1)
                <span class="label label-info pull-right">TEMPORADA</span>
                @endif
            </div>
        </div>
        <div class="choose">
            <a title="Ver el detalle del producto"
                href="{{route('consulta.detalle',['producto' => $producto->producto_variante_id])}}"
                class="btn btn-primary btn-block">Ver detalle</a>
        </div>
    </div>
</div>
@endforeach
@endforeach