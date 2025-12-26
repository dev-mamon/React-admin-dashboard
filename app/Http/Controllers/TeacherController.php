<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        return Inertia::render('Teachers/index');
    }
}
