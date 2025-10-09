<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BasicController
{
    public $model = User::class;
    public $reactView = 'Admin/Users';
    public $reactRootView = 'admin';
    public $prefix4filter = 'users';

    public function setReactViewProperties(Request $request)
    {
        return ['role' => $request->role];
    }
    public function setPaginationInstance(Request $request, string $model)
    {
        $role = ucfirst($request->role);
        return $model::select('users.*')
            ->join('model_has_roles', 'users.id', '=', 'model_has_roles.model_id')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('roles.name', $role);
    }
}
