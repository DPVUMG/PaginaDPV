@extends('layouts.master')
@section('title','Perfil del usuario')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
            @include('partials.notificaciones')
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-sm-12">
            <div class="card hovercard">
                <div class="card-background">
                    <img class="card-bkimg" alt="" src="{{ asset('images/shop/advertisement.jpg') }}">
                </div>
                <div class="useravatar">
                    <img alt="useravatar" src="{{Auth::user()->persona->picture}}">
                </div>
                <div class="card-info">
                    <span class="card-title">{{Auth::user()->persona->nombre}} {{ Auth::user()->persona->apellido
                        }}</span>
                </div>
            </div>
        </div>
        <div class="col-lg-12 col-sm-12">
            <div id="tabs">
                <ul>
                    <li><a class="btn btn-secondary" href="#tabs-1">Pedidos ingresados</a></li>
                    <li><a class="btn btn-info" href="#tabs-2">Pedidos confirmados</a></li>
                    <li><a class="btn btn-warning" href="#tabs-3">Pedidos entregados</a></li>
                    <li><a class="btn btn-success" href="#tabs-4">Pedidos pagados</a></li>
                    <li><a class="btn btn-danger" href="#tabs-5">Pedidos cancelados</a></li>
                </ul>
                <div id="tabs-1">
                    <h4>Pedidos ingresados, escuela {{ Auth::user()->escuela->establecimiento }}</h4>
                    <div class="table-responsive">
                        <table class="dataTable display" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Entrega</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Mes</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Detalle</th>
                                    <th class="text-center">Cancelar</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($pedidos->filter(function($query) {
                                return $query->estado_pedido_id == 1;
                                })->all() as $pedido)
                                <tr>
                                    <td class="text-center">{{ $pedido->id }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_pedido)) }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}</td>
                                    <td class="text-left">{!! $pedido->descripcion !!}</td>
                                    <td class="text-right"><strong>Q {{ number_format($pedido->total, 2, '.', ',')
                                            }}</strong></td>
                                    <td class="text-center">{{ $pedido->mes->nombre }}</td>
                                    <td class="text-center">{{ $pedido->anio }}</td>
                                    <td class="text-center">{{ $pedido->estado_pedido->nombre }}</td>
                                    <td class="text-center">
                                        <a href="{{route('user.detalle_pedido',['numero' => $pedido->id])}}"
                                            title="Ver detalle del pedido número {{ $pedido->id }}"
                                            class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                    </td>
                                    <td class="text-center">
                                        <form id="formCancelarItem{{ $pedido->id }}" method="post"
                                            action="{{ route('user.cancelar', ['numero' => $pedido->id]) }}">
                                            @csrf
                                            @method('delete')
                                            <button class="btn btn-danger btn-sm btn-round btnCancelarItem"
                                                title="Cancelar el pedido número {{ $pedido->id }}"
                                                id="btnCancelarItem-{{ $pedido->id }}">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="tabs-2">
                    <h4>Pedidos confirmados, escuela {{ Auth::user()->escuela->establecimiento }}</h4>
                    <div class="table-responsive">
                        <table class="dataTable display" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Entrega</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Mes</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($pedidos->filter(function($query) {
                                return $query->estado_pedido_id == 2;
                                })->all() as $pedido)
                                <tr>
                                    <td class="text-center">{{ $pedido->id }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_pedido)) }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}</td>
                                    <td class="text-left">{!! $pedido->descripcion !!}</td>
                                    <td class="text-right"><strong>Q {{ number_format($pedido->total, 2, '.', ',')
                                            }}</strong></td>
                                    <td class="text-center">{{ $pedido->mes->nombre }}</td>
                                    <td class="text-center">{{ $pedido->anio }}</td>
                                    <td class="text-center">{{ $pedido->estado_pedido->nombre }}</td>
                                    <td class="text-center">
                                        <a href="{{route('user.detalle_pedido',['numero' => $pedido->id])}}"
                                            class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="tabs-3">
                    <h4>Pedidos entregados, escuela {{ Auth::user()->escuela->establecimiento }}</h4>
                    <div class="table-responsive">
                        <table class="dataTable display" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Entrega</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Mes</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($pedidos->filter(function($query) {
                                return $query->estado_pedido_id == 3;
                                })->all() as $pedido)
                                <tr>
                                    <td class="text-center">{{ $pedido->id }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_pedido)) }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}</td>
                                    <td class="text-left">{!! $pedido->descripcion !!}</td>
                                    <td class="text-right"><strong>Q {{ number_format($pedido->total, 2, '.', ',')
                                            }}</strong></td>
                                    <td class="text-center">{{ $pedido->mes->nombre }}</td>
                                    <td class="text-center">{{ $pedido->anio }}</td>
                                    <td class="text-center">{{ $pedido->estado_pedido->nombre }}</td>
                                    <td class="text-center">
                                        <a href="{{route('user.detalle_pedido',['numero' => $pedido->id])}}"
                                            class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="tabs-4">
                    <h4>Pedidos pagados, escuela {{ Auth::user()->escuela->establecimiento }}</h4>
                    <div class="table-responsive">
                        <table class="dataTable display" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Entrega</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Mes</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($pedidos->filter(function($query) {
                                return $query->estado_pedido_id == 4;
                                })->all() as $pedido)
                                <tr>
                                    <td class="text-center">{{ $pedido->id }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_pedido)) }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}</td>
                                    <td class="text-left">{!! $pedido->descripcion !!}</td>
                                    <td class="text-right"><strong>Q {{ number_format($pedido->total, 2, '.', ',')
                                            }}</strong></td>
                                    <td class="text-center">{{ $pedido->mes->nombre }}</td>
                                    <td class="text-center">{{ $pedido->anio }}</td>
                                    <td class="text-center">{{ $pedido->estado_pedido->nombre }}</td>
                                    <td class="text-center">
                                        <a href="{{route('user.detalle_pedido',['numero' => $pedido->id])}}"
                                            class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="tabs-5">
                    <h4>Pedidos cancelados, escuela {{ Auth::user()->escuela->establecimiento }}</h4>
                    <div class="table-responsive">
                        <table class="dataTable display" style="width:100%">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Fecha de Ingreso</th>
                                    <th class="text-center">Fecha de Entrega</th>
                                    <th class="text-center">Descripción</th>
                                    <th class="text-center">Total</th>
                                    <th class="text-center">Mes</th>
                                    <th class="text-center">Año</th>
                                    <th class="text-center">Estado</th>
                                    <th class="text-center">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($pedidos->filter(function($query) {
                                return $query->estado_pedido_id == 6;
                                })->all() as $pedido)
                                <tr>
                                    <td class="text-center">{{ $pedido->id }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_pedido)) }}</td>
                                    <td class="text-center">{{ date('d-m-Y', strtotime($pedido->fecha_entrega)) }}</td>
                                    <td class="text-left">{!! $pedido->descripcion !!}</td>
                                    <td class="text-right"><strong>Q {{ number_format($pedido->total, 2, '.', ',')
                                            }}</strong></td>
                                    <td class="text-center">{{ $pedido->mes->nombre }}</td>
                                    <td class="text-center">{{ $pedido->anio }}</td>
                                    <td class="text-center">{{ $pedido->estado_pedido->nombre }}</td>
                                    <td class="text-center">
                                        <a href="{{route('user.detalle_pedido',['numero' => $pedido->id])}}"
                                            class="btn btn-sm btn-info"><i class="fa fa-eye"></i></a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br><br><br>
</div>
@endsection
@section('scripts')
<script>
    $(document).ready(function() {
        $("#tabs").tabs();
    })
</script>
@endsection