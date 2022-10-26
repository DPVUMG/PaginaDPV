<div class="col-sm-3">{{--Panel izquierdo--}}
    <div class="left-sidebar">
        <h2>Categorías</h2>
        <div class="panel-group category-products" id="accordian" style="background: #f0f0e9;">{{--Categorias--}}
            @forelse ($categorias as $categoria)
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian"
                            href="#{{str_replace([' ',',','.'],['','',''],$categoria->nombre)}}">
                            <span class="badge pull-right">{{ $categoria->sub_categorias->count() }}</span>
                            {{$categoria->nombre}}
                        </a>
                    </h4>
                </div>
                <div id="{{str_replace([' ',',','.'],['','',''],$categoria->nombre)}}" class="panel-collapse collapse">
                    <div class="panel-body">
                        <ul>
                            @forelse($categoria->sub_categorias as $sub_categoria)
                            <li>
                                <i class="fa fa-angle-right"></i>
                                <a
                                    href="{{route('consulta.sub_categoria',['sub_categoria' => $sub_categoria->id])}}">{{$sub_categoria->nombre}}</a>
                                @php
                                $cantidad = 0;
                                foreach($sub_categoria->productos as $item)
                                {
                                $cantidad += $item->variantes->count();
                                }
                                @endphp
                                <span class="label label-primary pull-right">{{
                                    $cantidad }}</span>
                            </li>
                            @empty
                            No hay sub categorías
                            @endforelse
                        </ul>
                    </div>
                </div>
            </div>
            @empty
            No existen categorías
            @endforelse
        </div>{{--./Categorias--}}
    </div>
</div>{{--./Panel izquierdo--}}
