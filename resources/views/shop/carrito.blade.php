@extends('layouts.master')
@section('title', 'Carro de pedido')

@section('content')
<section id="cart_items">{{--Breadcumbs y Tabla--}}
	<div class="container">
		<div class="breadcrumbs">
			<ol class="breadcrumb">
				<li><a href="{{route('consulta.index')}}">Inicio</a></li>
				<li class="active">Carro de pedido</li>
			</ol>
		</div>
		@include('partials.detalle_carrito')
	</div>
</section>{{--./Breadcumbs y Tabla--}}

<section id="do_action">
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
			</div>
			<div class="col-sm-6">
				<div class="total_area">
					<ul>
						<li class="text-right">Total <h1 style="color: black;"><strong>{{ $total }}</strong></h1>
						</li>
					</ul>
					@if(!empty($carrito))
					<form id="formConfirmarPedido" method="get" action="{{ route('pedido.index') }}">
						@csrf
						@method('get')
						<button class="btn btn-lg btn-block check_out btn-round"
							title="Click para confirmar el pedido con los productos agregados al listado."
							id="btnConfirmarPedido">
							Confirmar Pedido
						</button>
					</form>
					@endif
				</div>
			</div>
		</div>
	</div>
</section>
<!--/#do_action-->
@endsection