<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\ConsoleOutput;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $totalItems = 5000;
        $chunkSize = 1000; // প্রতি ব্যাচে ১০০০ করে ইনসার্ট হবে

        $output = new ConsoleOutput;
        $progressBar = new ProgressBar($output, $totalItems);

        $output->writeln("<info>Uploading $totalItems products to database...</info>");
        $progressBar->start();

        for ($i = 0; $i < $totalItems; $i += $chunkSize) {
            $products = [];

            for ($j = 0; $j < $chunkSize; $j++) {
                if ($i + $j >= $totalItems) {
                    break;
                }

                $name = 'Product '.($i + $j + 1);
                $products[] = [
                    'name' => $name,
                    'slug' => Str::slug($name).'-'.Str::random(5),
                    'image' => 'https://picsum.photos/200/200?random='.($i + $j),
                    'description' => 'Detailed description for '.$name,
                    'price' => rand(100, 5000),
                    'quantity' => rand(1, 100),
                    'featured' => rand(0, 1),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            Product::insert($products);

            // প্রগ্রেস বার আপডেট করা হচ্ছে
            $progressBar->advance($chunkSize);
        }

        $progressBar->finish();
        $output->writeln("\n<info>Successfully uploaded all products!</info>");
    }
}
