<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\User;
use App\Role;
use App\Client;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class ClientTest extends TestCase
{
    // use RefreshDatabase;

    public function testsClientsAreCreatedCorrectly()
    {
        $role = factory(Role::class)->create(['name' => 'user']);
        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        $payload = [
            'name' => 'Lorem',
            'address' => 'Ipsum',
            'telephone' => '(+34) 555 111 222',
        ];

        $this->actingAs($user)
             ->json('POST', '/clients', $payload)
             ->assertStatus(200);
    }

    public function testsClientsAreUpdatedCorrectly()
    {
        $role = factory(Role::class)->create(['name' => 'user']);
        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        $client = factory(Client::class)->create([
            'name' => 'Client Name',
            'address' => 'Client Address',
            'telephone' => '(+34) 555 111 222',
        ]);

        $payload = [
            'name' => 'Lorem',
            'address' => 'Ipsum',
            'telephone' => '(+34) 555 111 223',
        ];

        $this->actingAs($user)
            ->json('PUT', '/clients/' . $client->id, $payload)
            ->assertStatus(200);
    }

    public function testsClientsAreDeletedCorrectly()
    {
        $role = factory(Role::class)->create(['name' => 'user']);
        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        $client = factory(Client::class)->create([
            'name' => 'Client Name',
            'address' => 'Client Address',
            'telephone' => '(+34) 555 111 222',
        ]);

        $this->actingAs($user)
            ->json('DELETE', '/clients/' . $client->id, [])
            ->assertStatus(200);
    }

    public function testClientsAreListedCorrectly()
    {
        $role = factory(Role::class)->create(['name' => 'user']);
        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        factory(Client::class)->create([
            'name' => 'Client Name',
            'address' => 'Client Address',
            'telephone' => '(+34) 555 111 222',
        ]);

        factory(Client::class)->create([
            'name' => 'Client Name 2',
            'address' => 'Client Address 2',
            'telephone' => '(+34) 555 111 222 2',
        ]);

        $response = $this->actingAs($user)
            ->json('GET', '/clients', [])
            ->assertStatus(200)
            ->assertJson([
                [ 'name' => 'Client Name', 'address' => 'Client Address', 'telephone' => '(+34) 555 111 222' ],
                [ 'name' => 'Client Name 2', 'address' => 'Client Address 2', 'telephone' => '(+34) 555 111 222 2' ]
            ])
            ->assertJsonStructure([
                '*' => ['id', 'name', 'address', 'telephone', 'created_at', 'updated_at'],
            ]);
    }

}
