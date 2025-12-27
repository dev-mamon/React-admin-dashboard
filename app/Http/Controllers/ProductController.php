<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $cacheKey = 'products_list_'.md5(serialize([$search, $perPage, $page]));

        $products = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($search, $perPage) {
            $query = Product::query();

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            }
            $limit = min((int) $perPage, 500);

            return $query->select('id', 'name', 'slug', 'price', 'status', 'image')
                ->latest()
                ->paginate($limit)
                ->withQueryString();
        });

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status' => 'required|in:active,inactive',
            'featured' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            $folderPath = public_path('uploads/products');
            if (! File::isDirectory($folderPath)) {
                File::makeDirectory($folderPath, 0777, true, true);
            }
            $imageName = time().'_'.Str::random(10).'.'.$request->image->extension();
            $request->image->move($folderPath, $imageName);
            $validated['image'] = '/uploads/products/'.$imageName;
        }
        $validated['slug'] = Str::slug($request->name);
        Product::create($validated);
        Cache::flush();

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully!');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'nullable|array',
            'all' => 'nullable|boolean',
        ]);

        if ($request->all === true) {
            Product::query()->delete();
        } elseif ($request->ids) {
            Product::whereIn('id', $request->ids)->delete();
        }
        Cache::flush();

        return back()->with('success', 'Products deleted successfully!');
    }
}
