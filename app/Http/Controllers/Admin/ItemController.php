<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Text;
use Exception;
use App\Models\Restaurant;
use SoDe\Extend\JSON;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Admin/Items';
    public $imageFields = ['image'];
    public $prefix4filter = 'items';

    public function mediaGallery(Request $request, string $uuid)
    {
        try {
            $snake_case = 'item/gallery';
            if (Text::has($uuid, '.')) {
                $route = "images/{$snake_case}/{$uuid}";
            } else {
                $route = "images/{$snake_case}/{$uuid}.img";
            }
            $content = Storage::get($route);
            if (!$content) throw new Exception('Imagen no encontrado');
            return response($content, 200, [
                'Content-Type' => 'application/octet-stream'
            ]);
        } catch (\Throwable $th) {
            $content = Storage::get('utils/cover-404.svg');
            $status = 200;
            if ($this->throwMediaError) return null;
            return response($content, $status, [
                'Content-Type' => 'image/svg+xml'
            ]);
        }
    }

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::where('status', 1)->get();
        $restaurants = Restaurant::where('status', 1)->get();
        return [
            'categories' => $categories,
            'restaurants' => $restaurants,
        ];
    }

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::select(['items.*'])
            ->with(['category', 'restaurant'])
            ->leftJoin('categories AS category', 'category.id', 'items.category_id')
            ->leftJoin('restaurants AS restaurant', 'restaurant.id', 'items.restaurant_id');
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $presentations = JSON::parse($request->input('presentations', '[]'));
        $body['presentations'] = $presentations;
        return $body;
    }
}
