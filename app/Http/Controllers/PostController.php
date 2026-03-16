<?php

namespace App\Http\Controllers;

use App\Models\Commentt;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
// use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class PostController extends Controller
{


    //

    public function index() : Response
    {
        // $posts = Post::all();
        // $posts = Post::with('user')->withCount('likes')->latest()->get();

        // opzione fare infinite scroll nella pagina
        // carico 10 post per volta
        $posts = Inertia::scroll(
                fn () => Post::with('user')
                    ->withCount('likes')
                    ->latest()
                    ->cursorPaginate(10)
                
            );

       
        // nn so se è il modo migliore
        // ma funziona
        // sostituisco ogni post con un array che contiene i dati del post e i dati dell'utente che ha scritto il post, trasformati in UserResource
        // $posts = $posts->map(fn($post) => [
        //     ...$post->toArray(),
        //     'user' => new UserResource($post->user)
        // ]);
        
        return Inertia::render('posts/index', ['posts' => $posts]);
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
            'can_edit' => Auth::check() && Auth::user()->can('updatePost', $post),  // uso PostPolicy per verificare se l'utente autenticato può modificare il post, in questo caso se è l'autore del post
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
                    // 'user_has_liked' => $post->likes()->where('user_id', request()->user()?->id)->exists()
                    'user_has_liked' => Auth::check() ? $post->likes()->where('user_id', Auth::id())->exists() : false,
                ]
            )   
        ]);
    }


    public function create() : Response
    {
    
        // NB: pass il model Post così Laravel sa che mi sto riferendo alla policy PostPolicy e quindi sa che deve usare quella policy 
        Gate::authorize('createPost', Post::class); // uso PostPolicy per verificare se l'utente autenticato può creare un post


        return Inertia::render('posts/create');
    }   

    public function store(Request $request) : RedirectResponse
    {
        Gate::authorize('createPost', Post::class);
        
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:5|max:1000',
        ]);

        
        Post::create([
            ...$validated,
            // 'user_id' => User::inRandomOrder()->first()->id // soluzione temporanea per assegnare un user_id valido, in attesa di implementare l'autenticazione
            'user_id' => $request->user()->id // in questo modo prendo l'id dell'utente loggato, che è quello che ha scritto il post
        ]);

        return redirect()->route('posts.index');
    }
}