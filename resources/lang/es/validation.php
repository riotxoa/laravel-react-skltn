<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute debe ser aceptado.',
    'active_url'           => ':attribute no es una URL válida.',
    'after'                => ':attribute debe ser una fecha posterior a :date.',
    'after_or_equal'       => ':attribute debe ser una fecha posterior o igual a :date.',
    'alpha'                => ':attribute debe contener únicamente letras.',
    'alpha_dash'           => ':attribute debe contener únicamente letras, números y guiones.',
    'alpha_num'            => ':attribute debe contener únicamente letras y números.',
    'array'                => ':attribute debe ser un array.',
    'before'               => ':attribute debe ser una fecha anterior a :date.',
    'before_or_equal'      => ':attribute debe ser una fecha anterior o igual a :date.',
    'between'              => [
        'numeric' => ':attribute debe estar comprendido entre :min y :max.',
        'file'    => ':attribute debe tener un tamaño entre :min y :max kilobytes.',
        'string'  => ':attribute debe tener una longitud entre :min y :max caracteres.',
        'array'   => ':attribute debe contener entre :min y :max elementos.',
    ],
    'boolean'              => 'El valor de :attribute debe ser verdadero o falso.',
    'confirmed'            => 'La confirmación de :attribute no coincide con el valor introducido.',
    'date'                 => ':attribute no es una fecha válida.',
    'date_format'          => ':attribute no tiene el formato :format.',
    'different'            => 'Los valores de :attribute y :other deben ser diferentes.',
    'digits'               => ':attribute debe tener :digits dígitos.',
    'digits_between'       => ':attribute debe tener entre :min y :max dígitos.',
    'dimensions'           => ':attribute no tiene las dimensiones de imagen válidas.',
    'distinct'             => 'El campo :attribute tiene un valor duplicado.',
    'email'                => ':attribute debe ser una dirección de correo electrónico válida.',
    'exists'               => 'El :attribute seleccionado no es válido.',
    'file'                 => ':attribute debe ser un fichero.',
    'filled'               => 'El campo :attribute debe estar rellenado.',
    'image'                => ':attribute debe ser una imagen.',
    'in'                   => 'El :attribute seleccionado no es válido.',
    'in_array'             => 'El campo :attribute no existe en :other.',
    'integer'              => ':attribute debe ser un número entero.',
    'ip'                   => ':attribute debe ser una dirección IP válida.',
    'ipv4'                 => ':attribute debe ser una dirección IPv4 válida.',
    'ipv6'                 => ':attribute debe ser una dirección IPv6 válida.',
    'json'                 => ':attribute debe ser una cadena JSON válida.',
    'max'                  => [
        'numeric' => ':attribute no debe ser mayor que :max.',
        'file'    => ':attribute no debe tener un tamaño mayor que :max kilobytes.',
        'string'  => ':attribute no debe tener una longitud mayor que :max caracteres.',
        'array'   => ':attribute no debe contener más de :max elementos.',
    ],
    'mimes'                => ':attribute debe ser un fichero de tipo: :values.',
    'mimetypes'            => ':attribute debe ser un fichero de tipo: :values.',
    'min'                  => [
        'numeric' => ':attribute debe tener un valor mínimo de :min.',
        'file'    => ':attribute debe tener un tamaño mínimo de :min kilobytes.',
        'string'  => ':attribute debe tener una longitud mínima de :min caracteres.',
        'array'   => ':attribute debe contener al menos :min elementos.',
    ],
    'not_in'               => 'El :attribute seleccionado no es válido.',
    'numeric'              => ':attribute debe ser un número.',
    'present'              => 'El campo :attribute debe estar presente.',
    'regex'                => 'El formato :attribute no es válido.',
    'required'             => 'El campo :attribute es obligatorio.',
    'required_if'          => 'El campo :attribute es obligatorio cuando :other es :value.',
    'required_unless'      => 'El campo :attribute es obligatorio salvo que :other esté en :values.',
    'required_with'        => 'El campo :attribute es obligatorio cuando :values está presente.',
    'required_with_all'    => 'El campo :attribute es obligatorio cuando :values está presente.',
    'required_without'     => 'El campo :attribute es obligatorio cuando :values no está presente.',
    'required_without_all' => 'El campo :attribute es obligatorio cuando ninguno de los valores :values están presentes.',
    'same'                 => ':attribute y :other deben ser iguales.',
    'size'                 => [
        'numeric' => ':attribute debe ser :size.',
        'file'    => ':attribute debe tener un tamaño de :size kilobytes.',
        'string'  => ':attribute debe tener una longitud de :size caracteres.',
        'array'   => ':attribute debe contener :size elementos.',
    ],
    'string'               => ':attribute debe ser una cadena.',
    'timezone'             => ':attribute debe ser una zona horaria válida.',
    'unique'               => 'El valor de :attribute ya ha sido utilizado.',
    'uploaded'             => ':attribute falló al subirse.',
    'url'                  => 'El formato de :attribute no es válido.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
