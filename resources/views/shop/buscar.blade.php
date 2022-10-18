@extends('layouts.master')
@section('title', 'Busqueda')

@section('content')

<section>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                @if ($productos->count() > 0)
                @foreach ($productos as $producto)
                <div class="media">
                    <div class="media-left media-middle">
                        <img class="media-object" style="width:100px;height:100px;"
                            src="{{ $producto->getPictureAttribute($producto->producto_id, is_null($producto->producto_foto) ? '' : $producto->producto_foto ) }}"
                            alt="{{ $producto->producto_nombre }}" height="250px" />
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">{{$producto->producto_nombre}}</h4>
                        <p>{!! $producto->producto_descripcion !!}</p>
                        <p>
                            <a href="{{route('consulta.detalle',['producto' => $producto->producto_variante_id])}}"
                                class="btn btn-info">
                                Ver detalle
                            </a>
                        </p>
                    </div>
                </div>
                @endforeach
                <div style="margin-top:20px">
                    <ul class="pagination">
                        {{$productos->links()}}
                    </ul>
                </div>
                @else
                <div class="alert alert-danger">
                    <strong>¡Mensaje!</strong> no se encontro información.
                </div>
                @endif
                <br><br>
            </div>
        </div>
    </div>

</section>



@endsection