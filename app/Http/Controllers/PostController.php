<?php

namespace App\Http\Controllers;

use App\Models\Commentt;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class PostController extends Controller
{


    //

    public function index() : Response
    {
        // $posts = Post::all();
        $posts = Post::with('user')->latest()->get();
        return inertia('posts/index', ['posts' => $posts]);
    }


    public function show(string $id) : Response
    {
        // $post = Post::with('user')->findOrFail($id);
        $posts = Post::with([
            'user',
            'commentts' => fn($query) => $query->with('user')->latest()           
        ])->findOrFail($id);

        // dd($posts);
        return inertia('posts/show', ['post' => $posts]);

    }


    public function create() : Response
    {
        return inertia('posts/create');
    }   

    public function store(Request $request) : RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:5|max:1000',
        ]);

        
        Post::create([
            ...$validated,
            'user_id' => User::inRandomOrder()->first()->id // soluzione temporanea per assegnare un user_id valido, in attesa di implementare l'autenticazione
        ]);

        return redirect('/posts');
    }
}
