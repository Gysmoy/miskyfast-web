<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

class StatusController extends Controller
{
    public function all()
    {
        $response = Response::simpleTryCatch(function () {
            return Status::where('status', true)
                ->get();
        });
        return response($response->toArray(), $response->status);
    }
}
