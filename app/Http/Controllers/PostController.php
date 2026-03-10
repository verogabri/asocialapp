<?php

namespace App\Http\Controllers;

use App\Models\Commentt;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;


class PostController extends Controller
{


    //

    public function index() : Response
    {
        // $posts = Post::all();
        $posts = Post::with('user')->withCount('likes')->latest()->get();
        
        return Inertia::render('posts/index', ['posts' => $posts]);
    }


    public function show_00(string $id) : Response
    {
        // $post = Post::with('user')->findOrFail($id);
        $posts = Post::with([
            'user',
            'commentts' => fn($query) => $query->with('user')->latest()           
        ])->findOrFail($id);

        // dd($posts);
        return Inertia::render('posts/show', ['post' => $posts]);

    }


    /**
     * Versione con commentts caricati in modo asincrono, usando Inertia::defer
     * In questo modo, la pagina del post viene renderizzata subito, e i commentts vengono caricati in un secondo momento, una volta che la pagina è già stata visualizzata. Questo migliora la percezione di velocità da parte dell'utente, soprattutto se ci sono molti commentts da caricare.
     * poi va cambaito anche la pagina show e usare <Deffer>
     */
    public function show(string $id) : Response
    {
        $post = Post::with('user')->findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => $post,
            'commentts' => Inertia::defer(
                fn() => Commentt::with('user')
                    ->where('post_id', $id)
                    ->latest()
                    ->get()
            ),
            'likes' => Inertia::defer(
                fn() => [
                    'count' => $post->likes()->count(),
                    // 'user_has_liked' => $post->likes()->where('ip_address', request()->ip())->where('user_agent', request()->userAgent())->exists()
                    'user_has_liked' => $post->likes()->where(['ip_address' => request()->ip(), 'user_agent' => request()->userAgent()])->exists()
                ]
            )   
        ]);
    }


    public function create() : Response
    {
        return Inertia::render('posts/create');
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

        return redirect()->route('posts.index');
    }
}