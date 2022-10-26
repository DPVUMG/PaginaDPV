@extends('layouts.master')

@section('title','Inicio')

@section('content')
<section>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                @include('partials.notificaciones')
            </div>
            <div class="col-sm-12">
                @if(Session::has('success'))
                <div class="row">
                    <div class="col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
                        <div id="charge-message" class="alert alert-success">
                            {{Session::get('success')}}
                        </div>
                    </div>
                </div>
                @endif
                <br><br>
            </div>
        </div>
        <div class="row">

            @include('partials.leftsidebar')

            <div class="col-sm-9 padding-right">
                <h2 class="title text-center">Productos agregados recientemente</h2>
                <div class="features_items" style="background: #f0f0e9;">{{-- Ultimos productos --}}
                    <br>
                    @include('partials.productos')
                </div>{{-- ./Ultimos productos --}}
            </div>

            <div class="col-sm-12">
                <br><br>
                {{-- Ultimos productos --}}
                <h2 class="title text-center">Categorías agregadas recientemente</h2>
                @include('partials.categorias')
                {{--./Pestañas Categorias--}}
                <br><br><br>
            </div>
        </div>

    </div>
</section>

@endsection
