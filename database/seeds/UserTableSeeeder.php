<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;

class UserTableSeeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_root = Role::where('name', 'root')->first();
        $role_admin  = Role::where('name', 'admin')->first();
        $role_user  = Role::where('name', 'user')->first();

        $root = new User();
        $root->name = 'Root Name';
        $root->email = 'root@example.com';
        $root->password = bcrypt('secret');
        $root->save();
        $root->roles()->attach($role_root);

        $admin = new User();
        $admin->name = 'Admin Name';
        $admin->email = 'admin@example.com';
        $admin->password = bcrypt('secret');
        $admin->save();
        $admin->roles()->attach($role_admin);

        $user = new User();
        $user->name = 'User Name';
        $user->email = 'user@example.com';
        $user->password = bcrypt('secret');
        $user->save();
        $user->roles()->attach($role_user);
    }
}
