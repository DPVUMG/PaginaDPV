@extends('layouts.master')
@section('title', 'Confirmación de pedido')

@section('content')
<section id="cart_items">{{-- Breadcumbs y Tabla --}}
    <div class="container">
        <div class="breadcrumbs">
            <ol class="breadcrumb">
                <li><a href="{{ route('consulta.index') }}">Inicio</a></li>
                <li class="active">Confirmación de pedido</li>
            </ol>
        </div>
        <h2 class="title text-center">Formulario para realizar el pedido</h2>
        <div class="well well-lg" style="background: #fe980f;">
            {!! Form::open(['route' => 'pedido.realizar', 'method' => 'POST', 'id' => 'payment-form', 'calss' =>
            'jumbotron']) !!}
            <div class="row">
                <div class="col-sm-12">
                    <div class="shopper-info">
                        <p>Informacion del pedido</p>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="shopper-info">
                        <label for="usuario">Usuario solicitante</label>
                        <input class="textbox" type="text" name="usuario"
                            value="{{ $usuario->persona->nombre }} {{ $usuario->persona->apellido }}" readonly>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="shopper-info">
                        <label for="escuela">Escuela solicitante</label>
                        <input class="textbox" type="text" name="escuela" value="{{ $escuela->establecimiento  }}"
                            readonly>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="shopper-info">
                        <label for="fecha_entrega">Fecha de entrega</label>
                        <input class="textbox" type="text" id="fecha_entrega" name="fecha_entrega"
                            value="{{ old('fecha_entrega') }}" readonly>
                    </div>
                </div>
                <div class="col-sm-5">
                    <div class="shopper-info">
                        <label for="alternate">Fecha seleccionada</label>
                        <input class="textbox" type="text" id="alternate" name="alternate"
                            value="{{ old('alternate') }}" readonly disabled>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="shopper-info">
                        <label for="descripcion">Observaciones</label>
                        <textarea class="textbox" rows="4" name="descripcion"
                            id="descripcion">{{ old('descripcion', 'Saludos cordiales') }}</textarea>
                    </div>
                </div>
            </div>
        </div>
        @include('partials.detalle_pedido')
    </div>
</section>{{-- ./Breadcumbs y Tabla --}}
<hr>
<section id="do_action">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
                <div class="total_area">
                    <ul>
                        <li class="text-right">Total
                            <h1 style="color: black;">
                                <strong>Q {{ number_format($total, 2, '.', ',') }}</strong>
                            </h1>
                        </li>
                        @if (!empty($carrito))
                        <li class="text-center">
                            <div class=" text-center align-middle"><button type="submit" id="complete-order"
                                    class="btn btn-lg btn-block btn-success">Realizar pedido ahora</button></div>
                        </li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
<!--/#do_action-->
@endsection
@section('scripts')
<script>
    CKEDITOR.replace('descripcion', {
        language: 'es',
        removePlugins: 'image',
    });  

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant', 
        nextText: 'Sig >' , 
        currentText: 'Hoy' , 
        monthNames: ['Enero', 'Febrero' , 'Marzo' , 'Abril' , 'Mayo', 'Junio' , 'Julio' , 'Agosto' , 'Septiembre' , 'Octubre' , 'Noviembre' , 'Diciembre' ], 
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May' ,'Jun','Jul','Ago','Sep', 'Oct' ,'Nov','Dic'], 
        dayNames: ['Domingo', 'Lunes', 'Martes' , 'Miércoles' , 'Jueves' , 'Viernes' , 'Sábado' ], 
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'], 
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'], 
        weekHeader: 'Sm' ,
        dateFormat: 'dd-mm-yy', 
        firstDay: 1, 
        isRTL: false, 
        showMonthAfterYear: 
        false, 
        yearSuffix: '' 
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);

    $(function() {
        $("#fecha_entrega").datepicker({
            showWeek: true,
            firstDay: 1,
            minDate: new Date(),
            altField: "#alternate",
            altFormat: "DD, d MM, yy",
            changeMonth: true,
            changeYear: true,
            maxDate: "+3M",
            showButtonPanel: true,
            showAnim: 'drop'
        });
    });

    $(document).ready(function() {
        $('#payment-form').validate({ // initialize the plugin
            rules: {
                fecha_entrega: {
                    required: true
                },
                descripcion: {
                    required: true,
                    minlength: 10
                },
            },
            messages: {
                fecha_entrega: {
                    required: "La fecha de entrega es obligatoria"
                },
                descripcion: {
                    required: "La descripción es obligatoria",
                    minlength: "La descripción es obligatoria"
                },
            }
        });   
    }); 

    $("#complete-order").on("click", function(e) {
        e.preventDefault();

        if($('#payment-form').valid()) {
            Swal.fire({
                title: 'Registar Pedido',
                text: '¿Desea registrar el pedido?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
                }).then((result) => {
                if (result.isConfirmed) {
                    $(`#payment-form`).first().submit();
                }
            })
        } else {
            Swal.fire({
                title: 'Validación',
                icon: 'error',
                text: 'Revisar el formularion, hay campos que son necesarios de validar.',
                allowOutsideClick: () => {
                    const popup = Swal.getPopup()
                    popup.classList.remove('swal2-show')
                    setTimeout(() => {
                        popup.classList.add('animate__animated', 'animate__headShake')
                    })
                    setTimeout(() => {
                        popup.classList.remove('animate__animated', 'animate__headShake')
                    }, 500)
                    return false
                }
            })        
        }
    });
</script>
@endsection