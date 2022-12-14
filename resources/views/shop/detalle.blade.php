@extends('layouts.master')

@section('title')
{{$producto->producto_nombre}}
@endsection

@section('content')
<section>
    <div class="container">
        <div class="row">
            @include('partials.leftsidebar')

            <div class="col-sm-9 padding-right">
                <div class="product-details">{{--Producto--}}
                    <div class="well well-lg" style="background: #f0f0e9;">
                        <div class="row">
                            <div class="col-sm-5">
                                <div id="cambiar_principal" class="view-product">{{--Imagen destacada--}}
                                    <img class="lazyload"
                                        data-src="{{ $producto->getPictureAttribute($producto->producto_id, is_null($producto->producto_foto) ? '' : $producto->producto_foto ) }}"
                                        alt="{{ $producto->producto_nombre }}" height="250px" />
                                </div>{{--./Imagen destacada--}}
                                <div id="similar-product" class="carousel slide" data-ride="carousel">{{--Carousel
                                    Imagenes--}}
                                    <div class="carousel-inner">
                                        @foreach($producto->images->chunk($producto->images->count()) as $bloque_images)
                                        <div class="item {{$loop->first ? 'active' : ''}}">
                                            @foreach($bloque_images as $imagen)
                                            <img data-src="{{ $imagen->getPictureAttribute() }}" alt="{{ $imagen->id }}"
                                                class="cambiar_imagen lazyload img-responsive"
                                                style="height:84px;width:71px">
                                            @endforeach
                                        </div>
                                        @endforeach
                                    </div>
                                    {{--Controles--}}
                                    <a class="left item-control" href="#similar-product" data-slide="prev">
                                        <i class="fa fa-angle-left"></i>
                                    </a>
                                    <a class="right item-control" href="#similar-product" data-slide="next">
                                        <i class="fa fa-angle-right"></i>
                                    </a>
                                </div>{{--./Carousel Imagenes--}}

                            </div>
                            <div class="col-sm-7">
                                <div class="product-information">{{--Informacion Producto--}}
                                    @if($producto->producto_nuevo == 1)
                                    <span class="label label-success newarrival">{{
                                        $producto->getStringNewProductAttribute($producto->producto_nuevo) }}</span>
                                    @endif

                                    <h2>{{$producto->producto_nombre}}</h2>
                                    <p>C??digo: {{$producto->producto_codigo}}</p>
                                    <span>
                                        <span>Precio: {{ is_null($producto->escuela_precio) ? $producto->producto_precio
                                            : $producto->escuela_precio
                                            }}</span>
                                        @if(Auth::check())
                                        {!!Form::open(['route'=>'carrito.agregar_mas','method'=>'POST', 'id' =>
                                        'formAgregarMas'])!!}
                                        {!!Form::hidden('product_id',$producto->producto_variante_id)!!}
                                        {!!Form::label('Cantidad:')!!}
                                        {!!Form::text('quantity',old('quantity', 1), ['class' =>
                                        'solo-numero '.($errors->has('quantity') ? 'border-danger':'')])!!}
                                        {!!Form::button('<i class="fa fa-shopping-cart"></i> Agregar al carro',[
                                        'class' => 'btn btn-default cart',
                                        'type' => 'submit',
                                        'id' => 'acciongregarMas'
                                        ])!!}
                                        {!!Form::close()!!}
                                        @endif
                                    </span>@if($producto->producto_temporada == 1)
                                    <span class="label label-warning ">TEMPORADA, el producto esta sujeto a
                                        cambios.</span>
                                    @endif

                                    <p><b>Marca:</b> {{ $producto->marca_nombre }}</p>
                                    <p><b>Varriante:</b> {{ $producto->variante_nombre }}</p>
                                    <p><b>Presentaci??n:</b> {{ $producto->presentacion_nombre }}</p>
                                    <p><b>Categor??a:</b> {{ $producto->categoria }}</p>
                                    <p><b>Sub categor??as:</b> {{ $producto->sub_categoria }}</p>
                                </div>{{--./Informacion Producto--}}
                            </div>
                        </div>{{--./Producto--}}
                    </div>
                </div>

                <div class="well well-lg">
                    <ul class="nav nav-tabs nav-justified">
                        <li class="active"><a href="#description" data-toggle="tab">Descripci??n</a></li>
                        <li><a href="#comments" data-toggle="tab">{{ 'Comentarios
                                ('.$producto->comentarios->where('escuela_usuario_id', Auth::user() == null ? 0 :
                                Auth::user()->id)->count().')'
                                }}</a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="description" class="tab-pane fade in active">
                            <br>
                            {!! $producto->producto_descripcion !!}
                        </div>
                        <div id="comments" class="tab-pane fade">
                            <h2>Comentar respecto al producto {{$producto->producto_nombre}}</h2>
                            <div class="signup-form">
                                <h2>Comentar respecto al producto {{$producto->producto_nombre}}</h2>
                                {!! Form::open(['route' => 'comentario_producto.nuevo', 'method' => 'POST']) !!}
                                <input type="hidden" name="product_id" value="{{ $producto->producto_id }}">
                                <input type="hidden" name="producto_variante_id"
                                    value="{{ $producto->producto_variante_id }}">
                                <textarea class="textbox" name="comment"></textarea>
                                <button type="submit" class="btn btn-default pull-right"
                                    value="registrar">Comentar</button>
                                {!! Form::close() !!}
                            </div>
                            <br><br>
                            <hr>
                            @foreach ($producto->comentarios->where('escuela_usuario_id', Auth::user() == null ? 0 :
                            Auth::user()->id)->reverse()->take(10) as $comentario)
                            <div class="panel panel-primary">
                                <div class="panel-heading">
                                    <h3 class="panel-title">
                                        {{ $comentario->usuario->usuario.' - '.$comentario->getStringFechaAttribute()
                                        }}
                                        @if (Auth::check())
                                        @if ($comentario->escuela_usuario_id == Auth::user()->id)
                                        <a href="{{route('comentario_producto.eliminar',['id' => $comentario->id])}}"
                                            class="btn btn-danger btn-xs pull-right">X</a>
                                        @endif
                                        @endif
                                    </h3>
                                </div>
                                <div class="panel-body">{{ $comentario->comment }}</div>
                            </div>
                            @endforeach
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection