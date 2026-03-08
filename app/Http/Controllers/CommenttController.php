<?php

namespace App\Http\Controllers;

use App\Models\Commentt;
use App\Http\Requests\StoreCommenttRequest;
use App\Http\Requests\UpdateCommenttRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;


class CommenttController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommenttRequest $request) : RedirectResponse
    {
        //
        $validated = $request->validated();
        Commentt::create([
            ...$validated,
            'user_id' => User::inRandomOrder()->first()->id, // soluzione temporanea per assegnare un user_id valido, in attesa di implementare l'autenticazione
        ]);

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     */
    public function show(Commentt $commentt)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commentt $commentt)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommenttRequest $request, Commentt $commentt)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commentt $commentt)
    {
        //
    }
}
