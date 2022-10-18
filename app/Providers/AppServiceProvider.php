<?php

namespace App\Providers;

use App\Models\Comentario;
use App\Models\Configuracion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        $configuracion = Configuracion::where('pagina', true)->first();
        $mensaje = 'Configurar página';

        //Variables globales para utilizar en el Blade de Header ubicado en views/partials/header
        view()->composer('partials.header', function ($view) use ($configuracion, $mensaje) {
            $contar_comentarios = Comentario::where('escuela_usuario_id', Auth::user() == null ? 0 : Auth::user()->id)->count();
            $view->with('comentarios', $contar_comentarios);

            if (!is_null($configuracion)) {
                $view->with('nombre_empresa', $configuracion->nombre);
                $view->with('slogan', $configuracion->slogan);
                $view->with('logotipo', $configuracion->getLogotipoPictureAttribute());
                $view->with('facebook', $configuracion->facebook);
                $view->with('twitter', $configuracion->twitter);
                $view->with('instagram', $configuracion->instagram);
                $view->with('page', $configuracion->url);
            } else {
                $view->with('nombre_empresa', $mensaje);
                $view->with('slogan', $mensaje);
                $view->with('logotipo', $mensaje);
                $view->with('facebook', $mensaje);
                $view->with('twitter', $mensaje);
                $view->with('instagram', $mensaje);
                $view->with('page', $mensaje);
            }
        });

        //Variables globales para utilizar en el Blade de Index ubicado en views/shop/index
        view()->composer('shop.index', function ($view) use ($configuracion, $mensaje) {
            if (!is_null($configuracion))
                $view->with('nombre_empresa', $configuracion->nombre);
            else
                $view->with('nombre_empresa', $mensaje);
        });

        //Variables globales para utilizar en el Blade de Header ubicado en views/partials/footer
        view()->composer('partials.footer', function ($view) use ($configuracion, $mensaje) {
            if (!is_null($configuracion)) {
                $view->with('nombre_empresa', $configuracion->nombre);
                $view->with('slogan', $configuracion->slogan);
            } else {
                $view->with('nombre_empresa', $mensaje);
                $view->with('slogan', $mensaje);
            }
        });
    }
}
