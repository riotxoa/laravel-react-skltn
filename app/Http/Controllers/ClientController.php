<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\Traits\CsvTrait;

class ClientController extends Controller
{
    use CsvTrait;

    protected $csvFileName = 'clients';

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
        $request->user()->authorizeRoles(['root', 'admin', 'user']);

        $clients = Client::all();
        $sorted = $clients->sortBy('name');

        return response()->json($sorted->values()->all());
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
        $request->user()->authorizeRoles(['root', 'admin', 'user']);

        $client = new Client([
          'name' => $request->get('name'),
          'address' => $request->get('address'),
          'telephone' => $request->get('telephone'),
        ]);
        $client->save();

        return response()->json('Client Successfully added');
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
        $request->user()->authorizeRoles(['root', 'admin', 'user']);

        $client = Client::find($id);

        return response()->json($client);
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
        $request->user()->authorizeRoles(['root', 'admin', 'user']);

        $client = Client::find($id);
        $client->name = $request->get('name');
        $client->address = $request->get('address');
        $client->telephone = $request->get('telephone');
        $client->save();

        return response()->json('Client Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $request->user()->authorizeRoles(['root', 'admin', 'user']);

        $client = Client::find($id);
        $client->delete();

        return $this->index($request);
     }

     public function delete(Request $request)
     {
         $request->user()->authorizeRoles(['root', 'admin', 'user']);

         $clientes = $request->get('data');

         $return = "";

         foreach($clientes as $id) {
             $return .= $id . ", ";
             $client = Client::find($id);
             $client->delete();
         }
         return $this->index($request);
     }

     public function getCsvFileName() {
         return $this->csvFileName;
     }

     public function insertCsvFields($dataImported) {
         Client::insert($dataImported);
     }

     public function getCsvFields() {
         return Client::get(['name', 'address', 'telephone']);
     }

}
