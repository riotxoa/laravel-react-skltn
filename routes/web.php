<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('home');
// });

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/user/logged', 'FrontEndUserController@logged');
Route::resource('/users', 'FrontEndUserController');
Route::resource('/roles', 'FrontEndRoleController');
Route::post('/clients/import', 'ClientController@uploadCSV');
Route::get('/clients/export', 'ClientController@downloadCSV');
Route::post('/clients/export/delete', 'ClientController@deleteCSV');
Route::resource('/clients', 'ClientController');
Route::post('/clients/delete', 'ClientController@delete');
