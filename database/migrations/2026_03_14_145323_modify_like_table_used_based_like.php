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
        //
        Schema::table('likes', function (Blueprint $table) {
            // Drop foreign key constraint first
            $table->dropForeign(['post_id']);
            
            // Drop unique index
            $table->dropUnique(['post_id', 'ip_address', 'user_agent']);

            // Drop columns
            $table->dropColumn(['ip_address', 'user_agent']);

            // Add user_id column with foreign key
            $table->foreignId('user_id')->after('post_id')->constrained()->onDelete('cascade');

            // Add new unique constraint
            $table->unique(['post_id', 'user_id']);
            
            // Re-add foreign key for post_id
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // Drop foreign key on post_id
            $table->dropForeign(['post_id']);
            
            // Drop unique constraint
            $table->dropUnique(['post_id', 'user_id']);
            
            // Drop user_id foreign key and column
            $table->dropForeign(['user_id'])->nullable();
            $table->dropColumn('user_id')->nullable();
            
            // Add back ip_address and user_agent columns
            $table->string('ip_address', 45);
            $table->string('user_agent', 500);
            
            // Add back original unique constraint
            $table->unique(['post_id', 'ip_address', 'user_agent']);
            
            // Re-add foreign key for post_id
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
        });

    }
};
