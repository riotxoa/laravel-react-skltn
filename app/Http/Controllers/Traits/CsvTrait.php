<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;

trait CsvTrait
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function uploadCSV(Request $request)
    {
        if($request->hasFile('file')) {
            $path = $request->file('file')->getRealPath();
            $data = \Excel::load($path, function($reader){

            })->get();
            if(!empty($data) && $data->count()) {
                $data = $data->toArray();
                for($i = 0; $i < count($data); $i++) {
                    $dataImported[] = $data[$i];
                }
            }
            $this->insertCsvFields($dataImported);

            return $this->index($request);
        }

        return response()->json("Error en la subida. Vuelva a intentarlo");
   }

    /**
     * export a file in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function downloadCSV() {

        $fields = $this->getCsvFields();

        $filepath= \Excel::create($this->getCsvFileName(), function($excel) use($fields) {
            $excel->sheet('ExportFile', function($sheet) use($fields) {
                $sheet->fromArray($fields);
            });
        })->store('csv', public_path('exports'), true);

        $publicpath = public_path();
        $file = str_replace($publicpath, '', $filepath['full']);

        return response()->json($file);
    }

    public function deleteCSV() {
        $file = public_path('exports') . "/" . $this->getCsvFileName() . ".csv";
        \File::delete($file);
        return response()->json($file . " file deleted");
    }
}
