@extends('layouts.main')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <a href="/"><img class="img-responsive" src="/img/logo.png" style="margin:30px 0;padding-top:25%;"/></a>
            <div class="panel panel-default">
                <div class="panel-heading text-center">Configurar nueva contraseña</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success text-center">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="control-label">Correo electrónico</label>

                            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>

                        <div class="form-group">
                            <button type="submit" class="col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-0 btn btn-primary">
                                Enviar enlace
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <a class="btn-xs col-xs-12 text-center" href="/" title="Volver a Inicio de Sesión">Volver a Inicio de Sesión</a>
        </div>
    </div>
</div>
@endsection
