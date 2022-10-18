<div class="card">
    <div class="table-responsive ">
        <table class="dataTable display cart_info" style="width:100%">
            <thead>
                <tr class="cart_menu">
                    <th colspan="4" class="text-center align-middle">Producto</th>
                    <th colspan="3" class="text-center align-middle">Pedido</th>
                    <th rowspan="2" class="text-center align-middle">Eliminar</th>
                </tr>
                <tr class="cart_menu">
                    <th class="text-center align-middle">Foto</th>
                    <th class="text-center align-middle">Nombre</th>
                    <th class="text-center align-middle">Variante</th>
                    <th class="text-center align-middle">Presentación</th>

                    <th class="text-center align-middle">Cantidad</th>
                    <th class="text-center align-middle">Precio</th>
                    <th class="text-center align-middle">Sub Total</th>
                </tr>
            </thead>
            <tbody>
                @if(Session::has('cart'))
                @forelse ($carrito as $item)
                <tr>
                    <td class="text-center">
                        <img src="{{ $item['producto_foto'] }}" alt="{{ $item['producto_codigo'] }}"
                            class="img-thumbnail" width="75px" height="75px">
                    </td>
                    <td class="text-left">
                        <form id="formDetalleItem{{ $item['producto_variante_id'] }}" method="get"
                            action="{{ route('consulta.detalle', ['producto' => $item['producto_variante_id']]) }}">
                            @csrf
                            @method('get')
                            <button class="btn btn-link btnDetalleItem" title="{{ " Información del producto
                                {$item['nombre_completo']}" }}" id="btnDetalleItem-{{ $item['producto_variante_id'] }}">
                                {{ $item['producto_nombre'] }}
                                <p>Código: {{ $item['producto_codigo'] }}</p>
                            </button>
                        </form>
                        @if ($item['producto_temporada'])
                        <small class="badge badge-warning">{{ __("precio según temporada") }}</small>
                        @endif
                    </td>
                    <td class="text-center">{{ $item['variante_nombre'] }}</td>
                    <td class="text-center">{{ $item['presentacion_nombre'] }}</td>

                    <td class="text-center" style="width: 200px;">
                        <div class="cart_quantity_button">
                            <a class="cart_quantity_up"
                                href="{{route('carrito.agregar_inmediatamente', ['producto' => $item['producto_variante_id']])}}">
                                + </a>
                            <input class="cart_quantity_input solo-numero" type="text" name="quantity"
                                value="{{ $item['cantidad'] }}" autocomplete="off" size="2" disabled>
                            <a class="cart_quantity_down"
                                href="{{route('carrito.eliminar_cantidad', ['producto' => $item['producto_variante_id']])}}">
                                - </a>
                        </div>
                    </td>
                    <td class="text-right">Q {{ number_format($item['precio_aplicado'], 2, '.', ',') }}</td>
                    <td class="text-right">Q {{ number_format($item['sub_total'], 2, '.', ',') }}</td>

                    <td class="text-center">
                        <form id="formEliminarItem{{ $item['producto_variante_id'] }}" method="get"
                            action="{{ route('carrito.eliminar', ['producto' => $item['producto_variante_id']]) }}">
                            @csrf
                            @method('get')
                            <button class="btn btn-danger btn-sm btn-round btnEliminarItem" title="{{ " Eliminar el
                                producto {$item['nombre_completo']}" }}"
                                id="btnEliminarItem-{{ $item['producto_variante_id'] }}">
                                <i class="fa fa-times"></i>
                            </button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="6">
                        <div class="alert alert-danger">
                            <strong>¡Mensaje!</strong> el carrito no tiene productos.
                        </div>
                    </td>
                </tr>
                @endforelse
                @else
                <tr>
                    <td colspan="6">
                        <div class="alert alert-danger">
                            <strong>¡Mensaje!</strong> usted no ha iniciado una compra.
                        </div>
                    </td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>
</div>