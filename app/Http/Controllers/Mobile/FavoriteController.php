<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\BasicController;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Response;

class FavoriteController extends BasicController
{
    public $model = Favorite::class;
    public $softDeletion = false;

    public function toggle(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $userId = Auth::id();
            $itemId = $request->input('item_id');

            $favorite = Favorite::where('user_id', $userId)
                ->where('item_id', $itemId)
                ->first();

            if ($favorite) {
                $favorite->delete();
                return false;
            } else {
                Favorite::create([
                    'user_id' => $userId,
                    'item_id' => $itemId,
                ]);
                return true;
            }
        });
        return response($response->toArray(), $response->status);
    }

    public function isFavorite(Request $request, $itemId)
    {
        $response = Response::simpleTryCatch(function () use ($itemId) {
            $userId = Auth::id();

            $favorite = Favorite::where('user_id', $userId)
                ->where('item_id', $itemId)
                ->first();

            return $favorite !== null;
        });
        return response($response->toArray(), $response->status);
    }

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::with(['item', 'item.restaurant'])->where('user_id', Auth::id());
    }
}