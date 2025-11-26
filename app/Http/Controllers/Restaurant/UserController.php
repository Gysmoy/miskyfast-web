<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Restaurant/Users';
    public $softDeletion = false;

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::where('restaurant_id', Auth::user()->restaurant_id)
            ->with('roles')
            ->whereHas('roles', function ($query) {
                $query->whereIn('name', ['Restaurant', 'Kitchen']);
            });
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $body['restaurant_id'] = Auth::user()->restaurant_id;

        $existingUser = User::query()
            ->where('email', $request->email)
            ->where('restaurant_id', '<>', Auth::user()->restaurant_id)
            ->exists();
        if ($existingUser) throw new Exception('El usuario ya existe. Por favor, envía una invitación.');

        return $body;
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        if ($isNew) {
            $jpa->assignRole([$request->role, 'Client']);
        }
    }
}
