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
        //
        $ip = $request->ip();
        $userAgent = $request->userAgent();

        $existingLike = $post->likes()->where([
            'ip_address' => $ip, 
            'user_agent' => $userAgent
        ])->first();

        if( $existingLike){
            // se esiste lo devo eliminare
            $existingLike->delete();
        } else {
            // va creato
            $post->likes()->create([
                'ip_address' => $ip,
                'user_agent' => $userAgent
            ]);

        }

        return back();
    }
}
