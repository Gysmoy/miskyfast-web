<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Testimony;
use App\Models\WebDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class TestimonyController extends BasicController
{
    public $model = Testimony::class;
    public $throwMediaError = true;
    public $reactView = 'Admin/Testimonies';
    public $imageFields = ['image'];

}
