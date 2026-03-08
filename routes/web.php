<?php

use App\Http\Controllers\CommenttController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;


Route::get('/', function () {
    // return view('welcome');
    return Inertia::render('home');
});
Route::get('/about', function () {
    return Inertia::render('about');
});

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::post('/commentts', [CommenttController::class, 'store'])->name('commentts.store');