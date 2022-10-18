<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public $productos = array();
    public $agragados_al_carrito = 0;
    public $total = 0;
    public $descuento = 0;

    public function __construct($oldCart)
    {
        if ($oldCart) {
            $this->productos = $oldCart->productos;
            $this->agragados_al_carrito = $oldCart->agragados_al_carrito;
            $this->total = $oldCart->total;
            $this->descuento = $oldCart->descuento;
        }
    }

    private function parseoData($producto, int $cantidad = 1)
    {
        $producto->escuela_precio = is_null($producto->escuela_precio) ? 0 : floatval(str_replace(['Q', ' '], ['', ''], $producto->escuela_precio));
        $producto->producto_precio = floatval(str_replace(['Q', ' '], ['', ''], $producto->producto_precio));
        $precio_aplicado = $producto->escuela_precio == 0 ? $producto->producto_precio : $producto->escuela_precio;
        $descuento = $producto->producto_precio - $producto->escuela_precio;

        return [
            'nombre_completo' => "{$producto->producto_nombre} - {$producto->variante_nombre}/{$producto->presentacion_nombre}",
            'producto_variante_id' => $producto->producto_variante_id,
            'producto_id' => $producto->producto_id,
            'producto_codigo' => $producto->producto_codigo,
            'producto_nombre' => $producto->producto_nombre,
            'producto_foto' => $producto->getPictureAttribute($producto->producto_id, is_null($producto->producto_foto) ? '' : $producto->producto_foto),
            'producto_temporada' => $producto->producto_temporada == 1,
            'marca_nombre' => $producto->marca_nombre,
            'variante_nombre' => $producto->variante_nombre,
            'presentacion_nombre' => $producto->presentacion_nombre,
            'categoria' => $producto->categoria,
            'escuela_id' => $producto->escuela_id,
            'variante_presentacion_id' => $producto->variante_presentacion_id,
            'variante_id' => $producto->variante_id,
            'presentacion_id' => $producto->presentacion_id,
            'cantidad' => $cantidad,
            'precio_real' => $producto->producto_precio,
            'precio_descuento' => $producto->escuela_precio,
            'descuento' => $producto->escuela_precio > 0 ? ($cantidad * $descuento) : 0,
            'sub_total' => $cantidad * $precio_aplicado,
            'precio_aplicado' => $precio_aplicado
        ];
    }

    //Función para agregar un producto al carrito
    public function agregar_un_producto($producto, int $cantidad = 1)
    {
        if (!empty($this->productos)) {
            if (array_key_exists($producto->producto_variante_id, $this->productos)) {
                $this->productos[$producto->producto_variante_id]['cantidad'] += 1;

                $descuento = $this->productos[$producto->producto_variante_id]['precio_descuento'] > 0 ? ($this->productos[$producto->producto_variante_id]['precio_real'] - $this->productos[$producto->producto_variante_id]['precio_descuento']) : 0;
                $precio = $this->productos[$producto->producto_variante_id]['precio_aplicado'];
                $subtotal = $this->productos[$producto->producto_variante_id]['cantidad'] * $precio;
                $descuento_total = $this->productos[$producto->producto_variante_id]['cantidad'] * $descuento;

                $this->total -= $this->productos[$producto->producto_variante_id]['sub_total'];
                $this->descuento -= $this->productos[$producto->producto_variante_id]['descuento'];
                $this->productos[$producto->producto_variante_id]['descuento'] = $descuento_total;
                $this->productos[$producto->producto_variante_id]['sub_total'] = number_format($subtotal, 2, '.', ',');
            } else {
                $agregar_item_al_carrito = $this->parseoData($producto, $cantidad);
                $subtotal = $agregar_item_al_carrito['sub_total'];
                $descuento_total = $agregar_item_al_carrito['descuento'];
                $this->productos[$producto->producto_variante_id] = $agregar_item_al_carrito;
            }
        } else {
            $agregar_item_al_carrito = $this->parseoData($producto, $cantidad);
            $subtotal = $agregar_item_al_carrito['sub_total'];
            $descuento_total = $agregar_item_al_carrito['descuento'];
            $this->productos[$producto->producto_variante_id] = $agregar_item_al_carrito;
        }

        $this->agragados_al_carrito++;
        $this->total += $subtotal;
        $this->descuento += $descuento_total;
    }

    //Función para aumentar la cantidad de un producto
    public function agregar_varios_productos(int $producto_variante_id, int $nueva_cantidad, $producto)
    {
        if (array_key_exists($producto_variante_id, $this->productos)) {
            $descuento = $this->productos[$producto->producto_variante_id]['precio_descuento'] > 0 ? ($this->productos[$producto->producto_variante_id]['precio_real'] - $this->productos[$producto->producto_variante_id]['precio_descuento']) : 0;
            $precio = $this->productos[$producto_variante_id]['precio_aplicado'];
            $subtotal = $this->productos[$producto_variante_id]['cantidad'] * $precio;
            $descuento_total = $this->productos[$producto->producto_variante_id]['cantidad'] * $descuento;

            $this->total -= $this->productos[$producto_variante_id]['sub_total'];
            $this->descuento -= $this->productos[$producto_variante_id]['descuento'];
            $this->productos[$producto_variante_id]['cantidad'] += $nueva_cantidad;
            $this->productos[$producto_variante_id]['descuento'] = $descuento_total;
            $this->productos[$producto_variante_id]['sub_total'] = number_format($subtotal, 2, '.', ',');
        } else {
            $agregar_item_al_carrito = $this->parseoData($producto, $nueva_cantidad);
            $subtotal = $agregar_item_al_carrito['sub_total'];
            $descuento_total = $agregar_item_al_carrito['descuento'];
            $this->productos[$producto_variante_id] = $agregar_item_al_carrito;
        }

        $this->agragados_al_carrito += $nueva_cantidad;
        $this->total += $subtotal;
        $this->descuento += $descuento_total;
    }

    //Función para eliminar producto del carrito
    public function eliminar_producto(int $producto_variante_id)
    {
        $producto = $this->productos[$producto_variante_id];
        unset($this->productos[$producto_variante_id]);

        if (empty($this->productos)) {
            $this->productos = array();
            $this->agragados_al_carrito = 0;
            $this->total = 0;
        } else {
            $this->agragados_al_carrito -= $producto['cantidad'];
            $this->total -= $producto['sub_total'];
            $this->descuento -= $producto['descuento'];
        }
    }

    //Función para eliminar la cantidad de uno en uno el producto
    public function eliminar_un_producto($producto_id)
    {
        $this->productos[$producto_id]['cantidad'] -= 1;

        $descuento = $this->productos[$producto_id]['precio_real'] - $this->productos[$producto_id]['precio_descuento'];
        $precio = $this->productos[$producto_id]['precio_aplicado'];
        $subtotal = $this->productos[$producto_id]['cantidad'] * $precio;
        $descuento_total = $this->productos[$producto_id]['cantidad'] * $descuento;

        $this->total -= $this->productos[$producto_id]['sub_total'];
        $this->descuento -= $this->productos[$producto_id]['descuento'];
        $this->productos[$producto_id]['descuento'] = $descuento_total;
        $this->productos[$producto_id]['sub_total'] = number_format($subtotal, 2, '.', ',');

        $this->agragados_al_carrito -= 1;
        $this->total += $subtotal;
        $this->descuento += $descuento_total;

        if ($this->productos[$producto_id]['cantidad'] <= 0) {
            unset($this->productos[$producto_id]);

            if (empty($this->productos)) {
                $this->productos = array();
                $this->agragados_al_carrito = 0;
                $this->total = 0;
            }
        }
    }
}
