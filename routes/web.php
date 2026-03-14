<?php

use App\Http\Controllers\CommenttController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostToggleLike;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;




Route::get('/', function () {
    // return view('welcome');
    return Inertia::render('home');
})->name('home.index');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about.index');



Route::get('/auth/register', [RegisterController::class, 'create'])->name('auth.register.create');
Route::post('/auth/register', [RegisterController::class, 'store'])->name('auth.register.store');

Route::get('/auth/login', [LoginController::class, 'create'])->name('login');
Route::post('/auth/login', [LoginController::class, 'store'])->name('auth.login.store');
Route::delete('/auth/logout', [LoginController::class, 'destroy'])->name('auth.logout');


Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

// il middleware auth serve per proteggere le rotte che devono essere accessibili solo agli utenti autenticati, 
// in questo caso la rotta per creare un post e per commentare un post
// però così riosponde con un 302 che veien gestito dal form come un onSuccess e nella pagina di login vedo il toast di successo, 
// anche se in realtà non è successo niente, anzi, è successo che l'utente non è autenticato e quindi è stato reindirizzato alla pagina di login. 
// Quindi, invece di usare il middleware auth, potrei gestire l'autenticazione direttamente nel controller, 
// in modo da poter restituire un messaggio di errore più chiaro in caso di utente non autenticato.
Route::post('/commentts', [CommenttController::class, 'store'])->name('commentts.store')->middleware('auth');

Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::post('/posts/{post}/like/toggle', [PostToggleLike::class, '__invoke'])->name('posts.like-toggle');

