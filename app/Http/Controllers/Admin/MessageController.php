<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends BasicController
{
   public $model = Message::class;
   public $reactView = 'Admin/Messages';
   public $filterStatus = false;
   public $softDeletion = true;

   

}
