<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->string('ip_address', 45);
            $table->string('user_agent', 500);
            $table->timestamps();

            // Ensure one like per IP/user agent combination per post
            // ma perchè anche IP address e user agent? Per evitare che un bot possa fare like multipli, ma è comunque possibile che un utente possa fare like multipli se cambia IP o user agent. Se vuoi evitare completamente i like multipli, dovresti considerare di implementare un sistema di autenticazione e associare i like agli utenti autenticati.
            $table->unique(['post_id', 'ip_address', 'user_agent']);
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
