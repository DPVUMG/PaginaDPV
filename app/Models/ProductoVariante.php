<?php

namespace App\Models;

use App\Models\Variante;
use App\Models\Presentacion;
use App\Models\EscuelaDescuento;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Nicolaslopezj\Searchable\SearchableTrait;

class ProductoVariante extends Model
{
    use SearchableTrait;

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'producto.codigo' => 25,
            'producto.nombre' => 25,
            'marca.nombre' => 20,
            'variante.nombre' => 15,
            'presentacion.nombre' => 15
        ],
        'joins' => [
            'producto' => ['producto.id', 'producto_variante.producto_id'],
            'marca' => ['marca.id', 'producto.marca_id'],
            'variante' => ['variante.id', 'producto_variante.variante_id'],
            'presentacion' => ['presentacion.id', 'producto_variante.presentacion_id']
        ]
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'producto_variante';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'precio', 'producto_id', 'variante_presentacion_id', 'variante_id',
        'presentacion_id', 'activo', 'usuario_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'activo' => 'boolean',
    ];

    public function getPictureAttribute(int $producto_id, string $foto)
    {
        return $foto != '' ? Storage::disk('producto')->url("{$producto_id}/{$foto}") : asset('images/producto_default.png');
    }

    public function getStringNewProductAttribute(int $new_product)
    {
        return $new_product === 1 ? 'NUEVO' : 'HISTORICO';
    }

    public function scopeConsulta($query, int $escuela_id = 0)
    {
        $categoria = "(SELECT categoria.nombre FROM db_dpv.producto_subcategoria INNER JOIN db_dpv.categoria ON categoria.id = producto_subcategoria.categoria_id WHERE producto_subcategoria.producto_id = producto_variante.producto_id LIMIT 1) AS categoria";
        $sub_categoria = "(SELECT GROUP_CONCAT(sub_categoria.nombre) FROM db_dpv.producto_subcategoria INNER JOIN db_dpv.sub_categoria ON sub_categoria.id = producto_subcategoria.sub_categoria_id WHERE producto_subcategoria.producto_id = producto_variante.producto_id) AS sub_categoria";
        $producto_precio = "CONCAT('Q ',FORMAT(producto_variante.precio, 2)) AS producto_precio";
        $escuela_precio = "(SELECT CONCAT('Q ',FORMAT(escuela_descuento.precio, 2)) FROM db_dpv.escuela_descuento WHERE escuela_descuento.producto_variante_id = producto_variante.id AND escuela_descuento.activo = 1 AND escuela_descuento.escuela_id = {$escuela_id} LIMIT 1) AS escuela_precio";

        return $query->join('producto', 'producto.id', 'producto_variante.producto_id')
            ->join('marca', 'marca.id', 'producto.marca_id')
            ->join('variante', 'variante.id', 'producto_variante.variante_id')
            ->join('presentacion', 'presentacion.id', 'producto_variante.presentacion_id')
            ->select(
                [
                    'producto_variante.id AS producto_variante_id',
                    'producto.id AS producto_id',
                    'producto.codigo AS producto_codigo',
                    'producto.nombre AS producto_nombre',
                    'producto.descripcion AS producto_descripcion',
                    'producto.foto AS producto_foto',
                    'producto.nuevo AS producto_nuevo',
                    'producto.temporada AS producto_temporada',
                    'marca.nombre AS marca_nombre',
                    'variante.nombre AS variante_nombre',
                    'presentacion.nombre AS presentacion_nombre',
                    DB::RAW($categoria),
                    DB::RAW($sub_categoria),
                    DB::RAW($producto_precio),
                    DB::RAW($escuela_precio),
                    DB::RAW("{$escuela_id} AS escuela_id"),
                    'producto_variante.variante_presentacion_id AS variante_presentacion_id',
                    'variante.id AS variante_id',
                    'presentacion.id AS presentacion_id'
                ]
            );
    }

    public function producto_select()
    {
        return $this->hasOne(Producto::class, 'id', 'producto_id');
    }

    public function variante()
    {
        return $this->hasOne(Variante::class, 'id', 'variante_id');
    }

    public function presentacion()
    {
        return $this->hasOne(Presentacion::class, 'id', 'presentacion_id');
    }

    public function descuentos()
    {
        return $this->hasMany(EscuelaDescuento::class, 'producto_variante_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ProductoFoto::class, 'producto_id', 'producto_id');
    }

    public function comentarios()
    {
        return $this->hasMany(ComentarioProducto::class, 'producto_id', 'producto_id');
    }
}
