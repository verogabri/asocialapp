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


        if( !$request->user()) {
            return back()->withErrors(['auth' => 'You must be logged in to comment.']);
        }

        //
        $validated = $request->validated();
        Commentt::create([
            ...$validated,
            // 'user_id' => User::inRandomOrder()->first()->id, // soluzione temporanea per assegnare un user_id valido, in attesa di implementare l'autenticazione
            'user_id' => $request->user()->id, // in questo modo prendo l'id dell'utente loggato, che è quello che ha scritto il commento
        ]);

        // ritorno alla pagina precedente, con un messaggio di successo, che però non viene usato, 
        // perché il form viene resettato e quindi non c'è una nuova richiesta GET alla pagina, ma rimaniamo sulla stessa pagina, 
        // quindi non c'è modo di mostrare il messaggio di successo. Quindi, invece di usare un messaggio di successo, potrei restituire un messaggio di errore in caso di commento non valido, e gestire il messaggio di successo direttamente nel form, mostrando un alert o un toast al momento del successo.
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
