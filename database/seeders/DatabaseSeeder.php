<?php

namespace Database\Seeders;

use App\Models\Commentt;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // creo 10 utenti con ognuno 5 post
        User::factory(10)
            ->has(Post::factory()->count(5))
            ->create();

        // crep un utente specifico con 5 post e gli atta 5 post
        User::factory()
            ->has(Post::factory()->count(5))
            ->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);

        // la lisat degli user e dei posts
        $users = User::all();
        $posts = Post::all();

        // 200 commmentts con user id e post id a caso
        Commentt::factory(200)->create([
            'user_id' => fn() => $users->random()->id,
            'post_id' => fn() => $posts->random()->id,
        ]);

        

        /*
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        */
    }
}
