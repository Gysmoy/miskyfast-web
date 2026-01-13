<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use SoDe\Extend\Crypto;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class UserController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Admin/Users';
    public $reactRootView = 'admin';
    public $prefix4filter = 'users';
    public $softDeletion = false;
    public $filterStatus = false;

    public function setReactViewProperties(Request $request)
    {
        $prefixes = JSON::parse(File::get('./prefijocelular.json'));
        return [
            'role' => $request->role,
            'prefixes' => $prefixes,
        ];
    }
    public function setPaginationInstance(Request $request, string $model)
    {
        $role = ucfirst($request->role);
        return $model::select('users.*')
            ->with(['restaurant'])
            ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('roles.name', $role);
    }

    public function beforeSave(Request $request)
    {
        $messages = [
            'email.unique' => 'El correo electrónico ya está registrado.',
        ];

        $request->validate([
            'email' => 'required|email|unique:users,email,' . $request->id,
        ], $messages);

        return $request->all();
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        if ($isNew) {
            $password = Crypto::short();
            $jpa->assignRole([$request->role, 'Client']);
            $jpa->password = $password;
            $jpa->save();
            return [
                'email' => $request->email,
                'password' => $password,
            ];
        }
    }

    public function beforeDelete(Request $request)
    {
        Order::where('client_id', $request->id)->delete();
        return $request->all();
    }
}
