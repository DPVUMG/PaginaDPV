<?php

namespace App\Models;

use App\Models\Producto;
use App\Models\Categoria;
use App\Models\SubCategoria;
use App\Models\ProductoVariante;
use Illuminate\Database\Eloquent\Model;

class ProductoSubCategoria extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'producto_subcategoria';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'producto_id', 'categoria_id', 'sub_categoria_id', 'usuario_id'
    ];

    public function producto()
    {
        return $this->hasOne(Producto::class, 'id', 'producto_id');
    }

    public function categoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'categoria_id');
    }

    public function sub_categoria()
    {
        return $this->hasOne(SubCategoria::class, 'id', 'sub_categoria_id');
    }

    public function variantes()
    {
        return $this->hasMany(ProductoVariante::class, 'producto_id', 'producto_id');
    }
}
