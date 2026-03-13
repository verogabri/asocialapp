<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // tolgo il wrapping del json response, in questo modo quando ritorno un UserResource, invece di avere una struttura del tipo { "data": { "id": 1, "name": "John", "email": "
        JsonResource::withoutWrapping();
    }
}
