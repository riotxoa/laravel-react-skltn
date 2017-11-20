@extends('layouts.main')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <a href="/"><img class="img-responsive" src="/img/logo.png" style="margin:30px 0;padding-top:25%;"/></a>
            <div class="panel panel-default">
                <div class="panel-heading text-center">Iniciar sesión</div>

                <div class="panel-body">
                    <form class="login" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="control-label">Correo electrónico</label>

                            <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="control-label">Contraseña</label>

                            <input id="password" type="password" class="form-control" name="password" required>

                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>

                        <div class="form-group login">
                            <button type="submit" class="col-xs-8 col-xs-offset-2 col-md-5 col-md-offset-0 btn btn-primary">
                                Iniciar sesión
                            </button>
                        </div>

                        <div class="form-group forgot-pwd">
                            <a class="col-xs-12 btn-xs text-center" href="{{ route('password.request') }}">
                                ¿Has olvidado la contraseña?
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
