<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Notifications\MessageContactNotification;
use App\Helpers\NotificationHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends BasicController
{
    public $model = Message::class;

    public function beforeSave(Request $request): array
    {
        $messages = [
            'restaurant_name.required' => 'El nombre del restaurante es obligatorio.',
            'owner_name.required' => 'El nombre del propietario es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe tener el formato user@domain.com.',
            'email.max' => 'El correo electrónico no debe exceder los 320 caracteres.',
            'phone_prefix.required' => 'El prefijo del teléfono es obligatorio.',
            'phone.required' => 'El número de teléfono es obligatorio.',
            'phone.numeric' => 'El número de teléfono debe ser numérico.',
            'address.required' => 'La dirección es obligatoria.',
            'latitude.required' => 'La latitud es obligatoria.',
            'latitude.numeric' => 'La latitud debe ser numérica.',
            'longitude.required' => 'La longitud es obligatoria.',
            'longitude.numeric' => 'La longitud debe ser numérica.',
        ];

        if ($request->type == 'restaurant') {
            $validatedData = $request->validate([
                'restaurant_name' => 'required|string',
                'owner_name' => 'required|string',
                'email' => 'required|email|max:320',
                'phone_prefix' => 'required|string',
                'phone' => 'required|numeric',
                'address' => 'required|string',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
            ], $messages);
        } else {
            $validatedData = $request->validate([
                'owner_name' => 'required|string',
                'email' => 'required|email|max:320',
                'phone_prefix' => 'required|string',
                'phone' => 'required|numeric',
                'vehicle_type' => 'required|string',
            ], $messages);
        }

        $validatedData['type'] = $request->type;
        $validatedData['reference'] = $request->reference;
        $validatedData['license_number'] = $request->license_number;
        $validatedData['vehicle_type'] = $request->vehicle_type;
        $validatedData['plate_number'] = $request->plate_number;

        return $validatedData;
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        try {
            Log::info('MessageController - Iniciando envío de notificaciones', [
                'message_id' => $jpa->id,
                'email' => $jpa->email,
                'owner_name' => $jpa->owner_name,
                'type' => $jpa->type
            ]);

            // Enviar notificación al cliente y al administrador
            //COMENTANDO MAIL
            //NotificationHelper::sendToClientAndAdmin($jpa, new MessageContactNotification($jpa));

            Log::info('MessageController - Notificaciones enviadas exitosamente', [
                'message_id' => $jpa->id
            ]);
        } catch (\Exception $e) {
            Log::error('MessageController - Error enviando notificaciones', [
                'error' => $e->getMessage(),
                'message_id' => $jpa->id ?? 'unknown',
                'trace' => $e->getTraceAsString(),
                'email_settings' => [
                    'mail_host' => config('mail.mailers.smtp.host'),
                    'mail_port' => config('mail.mailers.smtp.port'),
                    'mail_encryption' => config('mail.mailers.smtp.encryption'),
                    'mail_from' => config('mail.from.address'),
                ]
            ]);
            // No lanzamos la excepción para no interrumpir el flujo del guardado
        }
    }
}
