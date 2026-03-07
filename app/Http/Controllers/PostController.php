<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class PostController extends Controller
{


    //

    public function index() : Response
    {
        // $posts = Post::all();
        $posts = Post::latest()->get();
        return inertia('posts/index', ['posts' => $posts]);
    }


    public function show(string $id) : Response
    {
        $post = Post::findOrFail($id);
        return inertia('posts/show', ['post' => $post]);

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

        Post::create($validated);

        return redirect('/posts');
    }
}
