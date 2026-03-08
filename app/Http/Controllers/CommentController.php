<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class CommentController extends Controller
{
    
    public function store(Request $request) : RedirectResponse
    {
        $validated = $request->validate([
            'body' => 'required|string|max:255',
            'post_id' => 'required|exists:posts,id',
        ]);

        Comment::create([
            ...$validated,
            'user_id' => User::inRandomOrder()->first()->id,
        ]);

        return Redirect::back();

    }
}
