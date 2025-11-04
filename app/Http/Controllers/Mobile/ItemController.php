<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\OrderDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\Response;
use SoDe\Extend\Text;

class ItemController extends Controller
{
    public function all(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $search = $request->query('search');

            if (Text::nullOrEmpty($search)) {
                throw new Exception('El parámetro de búsqueda es requerido');
            }

            // 🧩 Separar palabras individuales y filtrar las que tienen menos de 3 caracteres
            $terms = array_filter(
                preg_split('/\s+/', trim($search)),
                fn($word) => mb_strlen($word) >= 3
            );

            if (empty($terms)) {
                throw new Exception('Ingresa al menos una palabra de 3 o más caracteres');
            }

            // 🔍 Construir el SQL del "score" de relevancia
            $scoreSql = collect($terms)->map(function ($term) {
                $escaped = str_replace("'", "''", $term);
                return "(
                CASE 
                    WHEN items.name LIKE '%{$escaped}%' THEN 3
                    WHEN items.description LIKE '%{$escaped}%' THEN 2
                    WHEN restaurants.name LIKE '%{$escaped}%' THEN 1.5
                    WHEN categories.name LIKE '%{$escaped}%' THEN 1
                    ELSE 0 
                END
            )";
            })->implode(' + ');

            // 🧠 Query con joins a restaurant y category
            $builder = Item::query()
                ->select('items.*')
                ->selectRaw("({$scoreSql}) as relevance")
                ->join('restaurants', 'restaurants.id', '=', 'items.restaurant_id')
                ->join('categories', 'categories.id', '=', 'items.category_id')
                ->with(['restaurant', 'category'])
                ->where('items.visible', true)
                ->where('items.status', true)
                ->having('relevance', '>', 0) // solo los que tienen alguna coincidencia
                ->orderByDesc('relevance');

            // 🚀 Paginar con cursor (ideal para scroll infinito)
            return $builder->cursorPaginate(8);
        });

        return response($response->toArray(), $response->status);
    }

    public function bestSale()
    {
        $response = Response::simpleTryCatch(function () {
            // 🧮 Obtener los más vendidos
            $topItems = OrderDetail::select('item_id', DB::raw('COUNT(*) as total_sales'))
                ->groupBy('item_id')
                ->orderByDesc('total_sales')
                ->limit(4)
                ->pluck('item_id')
                ->toArray();

            $query = Item::with(['restaurant', 'category'])
                ->where('visible', true)
                ->where('status', true);

            if (!empty($topItems)) {
                // Traemos los top y rellenamos si faltan
                $items = $query->whereIn('id', $topItems)
                    ->orderByRaw("FIELD(id, " . implode(',', array_map(fn($id) => "'$id'", $topItems)) . ")")
                    ->get();

                // Si hay menos de 4, completar con aleatorios que no estén en la lista
                if ($items->count() < 4) {
                    $remaining = 4 - $items->count();
                    $extra = $query->whereNotIn('id', $topItems)
                        ->inRandomOrder()
                        ->limit($remaining)
                        ->get();
                    $items = $items->merge($extra);
                }
            } else {
                // 🎲 Si no hay ventas aún, traer 4 aleatorios
                $items = $query->inRandomOrder()->limit(4)->get();
            }

            return $items;
        });

        return response($response->toArray(), $response->status);
    }

    public function byField(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $query = Item::with(['restaurant', 'category'])
                ->where('visible', true)
                ->where('status', true);
            if ($request->restaurant) $query->where('restaurant_id', $request->restaurant);
            if ($request->category) $query->where('category_id', $request->category);
            return $query->get();
        });
        return response($response->toArray(), $response->status);
    }
}
