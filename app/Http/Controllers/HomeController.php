<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Category;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Order;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Testimony;
use App\Models\WebDetail;
use App\Policies\WebDetailPolicy;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;
use Carbon\Carbon;
use Exception;
use SoDe\Extend\Response;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $categoriesJpa = Category::query()
            ->where('featured', true)
            ->where('visible', true)
            ->where('status', true)
            ->get();
        $testimoniesJpa = Testimony::query()
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $prefixes = JSON::parse(File::get('./prefijocelular.json'));

        return [
            'categories' => $categoriesJpa,
            'testimonies' => $testimoniesJpa,
            'prefixes' => $prefixes,
            'gmaps_api_key' => env('GMAPS_API_KEY'),
        ];
    }

    public function graph(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $type = $request->type; // monthly, yearly, custom
            $filter = $request->filter;

            $query = Order::query()
                ->where('status_id', 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc')
                ->where('delivery_status_id', 'a0618dce-62e9-4720-8e1f-10f3208c357e');

            if ($type === 'monthly') {
                // filter: yyyy-mm
                $date = Carbon::createFromFormat('Y-m', $filter);
                $query->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month);
            } elseif ($type === 'yearly') {
                // filter: yyyy
                $year = (int) $filter;
                $query->whereYear('created_at', $year);
            } elseif ($type === 'custom') {
                // filter: yyyy-mm-dd|yyyy-mm-dd
                [$startDate, $endDate] = explode('|', $filter);
                $query->whereDate('created_at', '>=', $startDate)
                    ->whereDate('created_at', '<=', $endDate);
            } else {
                throw new Exception('Invalid type');
            }

            $data = [];

            if ($type === 'monthly' || $type === 'custom') {
                $results = $query->selectRaw("DATE(created_at) as label, COUNT(id) as count, SUM(total_amount) as amount")
                    ->groupBy('label')
                    ->orderBy('label')
                    ->get();
                $data = $results->map(function ($item) {
                    return [
                        'label' => Carbon::parse($item->label)->format('Y-m-d'),
                        'count' => (int) $item->count,
                        'amount' => (float) $item->amount
                    ];
                })->toArray();
            } elseif ($type === 'yearly') {
                $results = $query->selectRaw("DATE_FORMAT(created_at, '%Y') as label, COUNT(id) as count, SUM(total_amount) as amount")
                    ->groupBy('label')
                    ->orderBy('label')
                    ->get();
                $data = $results->map(function ($item) {
                    return [
                        'label' => $item->label,
                        'count' => (int) $item->count,
                        'amount' => (float) $item->amount
                    ];
                })->toArray();
            }

            return $data;
        });
        return response($response->toArray(), $response->status);
    }
}
