<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Post;


class PostPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }


    /**
     * Determine whether the user can create posts.
     * NB non è specificato il MOdel Post come secondo parametro, 
     * perché non è necessario, in quanto la creazione di un post non dipende da un post specifico, ma solo dall'autenticazione dell'utente. 
     * 
     */
    public function createPost( ?User $user): bool
    {
        // in questo caso, permetto a tutti gli utenti autenticati di creare un post, quindi ritorno true se l'utente è autenticato, altrimenti false
        return $user !== null;
    }

    /**
     * Determine whether the user can update the post.
     * ?User $user è nullable perché potrebbe essere null se l'utente non è autenticato,
     * quindi è importante gestire questo caso per evitare errori quando si tenta di accedere a $user->id.
     * 
     * 
     */
    public function updatePost( ?User $user, Post $post): bool
    {
        return $user !== null && $user->id === $post->user_id;
    }

    public function deletePost( User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}
