<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostToggleLike extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post)
    {
        // Verifica se l'utente è autenticato
        if (!$request->user()) {
            return back()->withErrors(['auth' => 'You must be logged in to like a post.']);
        }
       
        $existingLike = $post->likes()->where('user_id', $request->user()->id)->first();

        if ($existingLike) {
            // se esiste lo devo eliminare
            $existingLike->delete();
        } else {
            // va creato
            $post->likes()->create([
                'user_id' => $request->user()->id
            ]);
        }

        return back();
    }
}
