@extends('layouts.master')
@section('title', 'Detalle del Pedido')

@section('content')
<section id="cart_items">{{--Breadcumbs y Tabla--}}
    <div class="container">
        <div class="breadcrumbs">
            <ol class="breadcrumb">
                <li><a href="{{route('consulta.index')}}">Inicio</a></li>
                <li class="pull-right"><a href="{{route('user.perfil')}}">Regresar al listado de pedidos</a></li>
                <li class="active">Detalle del Pedido</li>
            </ol>
        </div>
        <h2>Detalle del Pedido #<strong>{{ $pedido->id }}</strong></h2>
        <div class="row well well-lg" style="background: #fe980f;">
            <div class="col-sm-12">
                <div class="shopper-info">
                    <p>Informacion del pedido</p>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="shopper-info">
                    <label for="usuario">Usuario solicitante</label>
                    <input class="textbox" type="text" name="usuario"
                        value="{{ $usuario->persona->nombre }} {{ $usuario->persona->apellido }}" readonly disabled>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="shopper-info">
                    <label for="escuela">Escuela solicitante</label>
                    <input class="textbox" type="text" name="escuela" value="{{ $escuela->establecimiento  }}" readonly
                        disabled>
                </div>
            </div>
            <div class="col-sm-3">
                <div class="shopper-info">
                    <label for="fecha_entrega">Fecha de entrega</label>
                    <input class="textbox" type="text" id="fecha_entrega" name="fecha_entrega"
                        value="{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}" readonly disabled>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="shopper-info">
                    <label for="alternate">Fecha seleccionada</label>
                    <meta charset='utf-8'>
                    @php
                    date_default_timezone_set("America/Guatemala");
                    setlocale(LC_TIME, 'es_GT.UTF-8','esp');
                    $fecha = strftime(" %A, %d de %B de %Y", strtotime($pedido->fecha_entrega));
                    @endphp
                    <input class="textbox" type="text" id="alternate" name="alternate" value="{{ $fecha }}" readonly
                        disabled>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="shopper-info">
                    <label for="descripcion">Observaciones</label>
                    {!! $pedido->descripcion !!}
                </div>
            </div>
        </div>
        <div class="card">
            <div class="table-responsive ">
                <table class="dataTableNotPaginate display cart_info" style="width:100%">
                    <thead>
                        <tr class="cart_menu">
                            <th colspan="4" class="text-center align-middle">Producto</th>
                            <th colspan="3" class="text-center align-middle">Pedido</th>
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
                        @foreach ($detalles as $item)
                        <tr>
                            <td class="text-center">
                                <img src="{{ $item->producto->picture }}" alt="{{ $item->producto->codigo }}"
                                    class="img-thumbnail" width="75px" height="75px">
                            </td>
                            <td class="text-left">
                                {{ $item->producto->nombre }}

                                <p>Código: {{ $item->producto->codigo }}</p>

                                @if ($item->producto->temporada)
                                <small class="badge badge-warning">{{ __("precio según temporada") }}</small>
                                @endif
                            </td>
                            <td class="text-center">{{ $item->variante->nombre }}</td>
                            <td class="text-center">{{ $item->presentacion->nombre }}</td>

                            <td class="text-center">{{ $item->cantidad }}</td>

                            <td class="text-right">Q {{ number_format($item->precio_descuento == 0 ?
                                $item->precio_real : $item->precio_descuento, 2, '.', ',') }}</td>
                            <td class="text-right">Q {{ number_format($item->sub_total, 2, '.', ',') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>{{--./Breadcumbs y Tabla--}}
<hr>
<section id="do_action">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
                <div class="total_area">
                    <ul>
                        <li class="text-right">Total <h1 style="color: black;"><strong>Q {{
                                    number_format($pedido->total,
                                    2, '.', ',') }}</strong>
                            </h1>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
<!--/#do_action-->
@endsection