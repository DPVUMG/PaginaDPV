<div class="row">
    <div class="col-sm-12">
        <div id="slider-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                @forelse($ofertas as $oferta)
                <div class="item {{ $loop->first ? 'active' : ''}}">
                    <div class="col-sm-6">
                        <h1><span>Recien ingreso</span> {{ $nombre_empresa }}</h1>
                        <h2>{{$oferta->nombre}}</h2>
                        {!! $oferta->descripcion !!}
                        <br>
                        <a href="{{route('consulta.detalle',['producto' => $oferta->id])}}"
                            class="btn btn-default get">Ver detalle</a>
                    </div>
                    <div class="col-sm-6">
                        <a href="{{route('consulta.detalle',['producto' => $oferta->id])}}"
                            class="sello girl img-responsive">Nuevo</a>
                    </div>
                </div>
                @empty
                No hay ofertas
                @endforelse
            </div>

            <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                <i class="fa fa-angle-left"></i>
            </a>
            <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                <i class="fa fa-angle-right"></i>
            </a>
        </div>
        <br><br>
        <hr>
    </div>
</div>
