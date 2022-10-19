<script src="{{asset('js/appgeneral.min.js')}}"></script>
<script src="{{asset('js/eshopper.min.js')}}"></script>
<script src="{{asset('js/custom.min.js')}}"></script>
<script src="{{asset('js/jquery.mlens-1.7.min.js')}}"></script>
<script src="{{asset('js/funcionalidad.js')}}"></script>
<script src="{{asset('js/lazyload.js')}}"></script>
<script src="{{asset('js/jquery-ui/jquery-ui.min.js')}}"></script>
<script src="{{asset('js/bootstrap-selectpicker.js')}}"></script>
<script src="{{asset('js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('js/jquery.validate.min.js')}}"></script>
<script src="{{asset('js/sweetalert2.js')}}"></script>
<script src="https://cdn.ckeditor.com/4.20.0/full-all/ckeditor.js"></script>
<script src="{{asset('js/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('js/jszip.min.js')}}"></script>
<script src="{{asset('js/pdfmake.min.js')}}"></script>
<script src="{{asset('js/vfs_fonts.js')}}"></script>
<script src="{{asset('js/buttons.html5.min.js')}}"></script>
<script src="{{asset('js/buttons.print.min.js')}}"></script>

<script>
    lazyload();
    window.oncontextmenu = function() {
        return false;
    }

    $('#recipeCarousel').carousel({
        interval: 10000
    })

    $('.carousel .carousel-item').each(function(){
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        
        for (var i=0;i<minPerSlide;i++) {
            next=next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            
            next.children(':first-child').clone().appendTo($(this));
        }
    });

    toastr.options = {
        "closeButton": true,
        "debug": true,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

  @if(Session::has('message'))
    var type = "{{ Session::get('alert-type', 'info') }}";
    switch(type){
        case 'info':
            toastr.info("{{ Session::get('message') }}");
            break;

        case 'warning':
            toastr.warning("{{ Session::get('message') }}");
            break;

        case 'success':
            toastr.success("{{ Session::get('message') }}");
            break;

        case 'error':
            toastr.error("{{ Session::get('message') }}");
            break;
    }
  @endif

  @if(count($errors) > 0)
    toastr.error("@foreach($errors->all() as $error)"+
                    "<p>{{$error}}</p>"+
                 "@endforeach");
  @endif

    $(document).ready(function()
    {
        $("#image_zoom").mlens(
        {
            imgSrc: $("#image_zoom").attr("data-big"),   // path of the hi-res version of the image
            lensShape: "circle",                // shape of the lens (circle/square)
            lensSize: 125,                  // size of the lens (in px)
            borderSize: 4,                  // size of the lens border (in px)
            borderColor: "#fff",                // color of the lens border (#hex)
            borderRadius: 4,                // border radius (optional, only if the shape is square)
            zoomLevel: 2,
            imgOverlay: $("#image_zoom").attr("data-overlay"), // path of the overlay image (optional)
            overlayAdapt: true // true if the overlay image has to adapt to the lens size (true/false)
        });

        $('.selectpicker').selectpicker();

        $('.dataTable').DataTable({
            serverSide: false,
            paging: true,
            autoWidth: true,
            processing: true,
            ordering: true,
            info: true,
            searching: true,
            responsive: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
            }
        });

        $('.dataTableExport').DataTable({
            serverSide: false,
            paging: true,
            autoWidth: true,
            processing: true,
            ordering: true,
            info: true,
            searching: true,
            responsive: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
            },
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

        $('.dataTableExportNotPaginate').DataTable({
            serverSide: false,
            paging: false,
            autoWidth: true,
            processing: true,
            ordering: false,
            info: true,
            searching: true,
            responsive: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
            },
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });

        $('.dataTableNotPaginate').DataTable({
            serverSide: false,
            paging: false,
            autoWidth: true,
            processing: true,
            ordering: true,
            info: true,
            searching: true,
            responsive: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
            }
        });

        $('.solo-numero').keyup(function () {
            this.value = (this.value + '').replace(/[^0-9]/g, '');
        });

        $(".btnEliminarItem").tooltip({
            show: {
                effect: "slideDown",
                delay: 250
            }
        });
    });

    $("#acciongregarMas").on( "click", function(e) {
        e.preventDefault();
        Swal.fire({
            title: '¡Carrito!',
            text: '¿Está seguro de agregar el producto al carrito?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
        }).then((result) => {
            if (result.value) {
                $(`#formAgregarMas`).first().submit();
            }
        })
    });
    

    $(".btnEliminarItem").on("click", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Eliminar',
            text: '¿Desea eliminar el producto de la lista?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
            }).then((result) => {
            if (result.isConfirmed) {
                let id = $(this).attr('id').split("-");
                $(`#formEliminarItem${id[1]}`).first().submit();
            }
        })
    });
    

    $(".btnDetalleItem").on("click", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Detalle',
            text: '¿Desea ver más información del producto?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
            }).then((result) => {
            if (result.isConfirmed) {
                let id = $(this).attr('id').split("-");
                $(`#formDetalleItem${id[1]}`).first().submit();
            }
        })
    });
    

    $("#btnConfirmarPedido").on("click", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Confirmar Pedido',
            text: '¿Desea confirmar el pedido?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
            }).then((result) => {
            if (result.isConfirmed) {
                $(`#formConfirmarPedido`).first().submit();
            }
        })
    });
    

    $(".btnCancelarItem").on("click", function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Cancelar',
            text: '¿Desea cancelar el pedido ingresado?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
            }).then((result) => {
            if (result.isConfirmed) {
                let id = $(this).attr('id').split("-");
                $(`#formCancelarItem${id[1]}`).first().submit();
            }
        })
    });

    var cambiar_imagen = document.querySelectorAll("div.item > img.cambiar_imagen");
    for (unHijo of cambiar_imagen) {
        unHijo.addEventListener("click", function(evt){
            var src = evt.target.src;
            var alt = evt.target.alt;
            document.getElementById("cambiar_principal").innerHTML = "";
            document.getElementById('cambiar_principal').innerHTML = '<img id="image_zoom" src="'+src+'" alt="'+alt+'"/>';

            $(document).ready(function()
            {
                $("#image_zoom").mlens(
                {
                    imgSrc: $("#image_zoom").attr("data-big"),   // path of the hi-res version of the image
                    lensShape: "circle",                // shape of the lens (circle/square)
                    lensSize: 125,                  // size of the lens (in px)
                    borderSize: 4,                  // size of the lens border (in px)
                    borderColor: "#fff",                // color of the lens border (#hex)
                    borderRadius: 4,                // border radius (optional, only if the shape is square)
                    zoomLevel: 2,
                    imgOverlay: $("#image_zoom").attr("data-overlay"), // path of the overlay image (optional)
                    overlayAdapt: true // true if the overlay image has to adapt to the lens size (true/false)
                });
            });
        });
    }
</script>