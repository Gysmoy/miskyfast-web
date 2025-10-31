<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Response;

class AddressController extends BasicController
{
    public $model = Address::class;
    public $reactView = 'Mobile/AddAddress';
    public $reactRootView = 'public';

    public function all()
    {
        $response = Response::simpleTryCatch(function () {
            return Address::query()
                ->where('user_id', Auth::id())
                ->get();
        });
        dump($response->toArray());
        return response($response->toArray(), $response->status);
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['user_id'] = Auth::id();

        $hasAddresses = Address::where('user_id', Auth::id())->exists();
        if (!$hasAddresses) {
            $body['is_default'] = true;
        }

        return $body;
    }
}
