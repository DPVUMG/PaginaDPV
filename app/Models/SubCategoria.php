<?php

namespace App\Models;

use App\Models\Categoria;
use App\Models\ProductoSubCategoria;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class SubCategoria extends Model
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
            'nombre' => 10
        ]
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'sub_categoria';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre', 'categoria_id', 'usuario_id'];

    //Mutadores
    public function getCategoryAttribute()
    {
        $category = Categoria::find($this->categoria_id)->nombre;
        return "{$category} / {$this->nombre}";
    }

    public function categoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'categoria_id');
    }

    public function productos()
    {
        return $this->hasMany(ProductoSubCategoria::class, 'sub_categoria_id', 'id');
    }
}
