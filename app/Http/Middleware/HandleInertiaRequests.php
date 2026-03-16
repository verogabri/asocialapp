<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            //
            // logged user information
            // 'user' => $request->user(),

            // invece di user, uso quelli di user trasformati in UserResource, in questo modo posso decidere quali campi del user voglio condividere con il client
            // 'user' => $request->user()?->toResource(),

            // per evitare conflitto di naming, metto tutto in un array 'auth', in questo modo posso accedere a user e can da auth.user e auth.can
            'auth' => [
                'user' => $request->user()?->toResource(),
                'can' => [
                    'post' => [
                        'createPost' => Auth::check() && $request->user()->can('createPost', Post::class),
                    ],
                ],
            ],
        ];
    }
}
