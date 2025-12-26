<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Students/index');
    }
}
