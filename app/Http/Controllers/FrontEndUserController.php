<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use Illuminate\Http\Request;

class FrontEndUserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->user()->authorizeRoles(['root', 'admin']);

        $users = User::all();

        foreach($users as $key => $user) {
            $role = $user->roles()->first();
            $users[$key]->role = $role;
        }
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->user()->authorizeRoles(['root', 'admin']);

        $user = new User([
          'name' => $request->get('name'),
          'email' => $request->get('email'),
          'password' => bcrypt($request->get('password')),
        ]);
        $user->save();

        $role_id = $request->get('role');
        $role = Role::where('id', $role_id)->first();
        $user->roles()->attach($role);

        return response()->json('User Successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $request->user()->authorizeRoles(['root', 'admin']);

        $user = User::find($id);
        $user->role = $user->roles()->first();
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->user()->authorizeRoles(['root', 'admin']);

        $user = User::find($id);
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        if($request->get('password'))
            $user->password = bcrypt($request->get('password'));
        $user->save();

        $role_id = $request->get('role');
        $role_new = Role::where('id', $role_id)->first();
        $role_old = $user->roles()->first();
        $user->roles()->detach($role_old);
        $user->roles()->attach($role_new);

        return response()->json('User Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $request->user()->authorizeRoles(['root', 'admin']);

        $user = User::find($id);
        $role = $user->roles()->first();
        $user->roles()->detach($role);
        $user->delete();

        return response()->json('User Successfully Deleted');
     }

}
