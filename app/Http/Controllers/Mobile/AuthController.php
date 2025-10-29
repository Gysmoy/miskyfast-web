<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Crypto;
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
            $roles = $user->getRoleNames();

            if (!$roles->contains('Client') && !$roles->contains('Delivery')) {
                throw new Exception('Debe iniciar sesión por la web');
            }

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

    public function register(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $request->validate([
                'name' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'phone' => 'required|string|max:20',
                'device_id' => 'nullable|string',
                'device_name' => 'nullable|string',
            ]);

            $user = User::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => bcrypt(Controller::decode($request->password)),
                'phone' => $request->phone,
            ]);

            $user->assignRole('Client');

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
        dump($response->toArray());
        return response($response->toArray(), $response->status);
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

    public function updateProfile(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $request->validate([
                'name' => 'required|string|max:255',
                'lastname' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'biography' => 'nullable|string',
                'profile' => 'nullable|string', // base64 jpeg
            ]);

            $userJpa = User::find(Auth::id());
            $userJpa->name = $request->name;
            $userJpa->lastname = $request->lastname;
            $userJpa->phone = $request->phone;
            $userJpa->biography = $request->biography;

            if ($request->filled('profile')) {
                // Decode base64 and force extension to .jpg
                $image = base64_decode($request->profile);
                $filename = Crypto::short() . '.jpg';
                $path = storage_path('app/images/user');
                if (!is_dir($path)) {
                    mkdir($path, 0755, true);
                }
                file_put_contents($path . '/' . $filename, $image);
                $userJpa->profile = $filename;
            }

            $userJpa->save();

            $userJpa->getRoleNames();
            return $userJpa;
        });
        return response($response->toArray(), $response->status);
    }

    public function devices(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $currentToken = $request->user()->currentAccessToken();

            $tokens = $request->user()->tokens()
                ->get(['id', 'device_name', 'ip_address', 'last_used_at', 'created_at']);

            $sessions = $tokens->map(function ($token) use ($currentToken) {
                return [
                    'id' => $token->id,
                    'device_name' => $token->device_name ?? 'Desconocido',
                    'ip_address' => $token->ip_address ?? 'N/A',
                    'last_used_at' => $token->last_used_at,
                    'created_at' => $token->created_at,
                    'current' => $currentToken && $token->id === $currentToken->id,
                ];
            });
            return $sessions;
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
