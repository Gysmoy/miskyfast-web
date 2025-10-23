<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $request->validate([
                'email' => 'required',
                'password' => 'required',
                'device_id' => 'nullable|string',
                'device_name' => 'nullable|string',
            ]);

            if (!Auth::attempt([
                'email' => Controller::decode($request->email),
                'password' => Controller::decode($request->password)
            ])) {
                throw new Exception('Credenciales inválidas');
            }

            $user = $request->user();
            $user->getRoleNames();
            $bearerToken = $user->createToken('app-token')->plainTextToken;

            $accessToken = $user->tokens()->latest()->first();
            $accessToken->device_id = $request->device_id;
            $accessToken->device_name = $request->device_name;
            $accessToken->ip_address = $request->ip();
            $accessToken->user_agent = $request->header('User-Agent');
            $accessToken->save();

            return [
                'user' => $user,
                'bearerToken' => $bearerToken
            ];
        });
        return response($response->toArray(), $response->status);
    }

    public function register(Request $request) {
        $response = Response::simpleTryCatch(function () {

        });

        return response($request->toArray(), $response->status);
    }

    public function verify(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $user = $request->user();
            $user->getRoleNames();
            return $user;
        });

        return response($response->toArray(), $response->status);
    }

    public function logout(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $user = $request->user();
            $user->currentAccessToken()->delete();
        });
        return response($response->toArray(), $response->status);
    }

    public function logoutAll(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $user = $request->user();
            $user->tokens()->delete();
        });

        return response($response->toArray(), $response->status);
    }
}
