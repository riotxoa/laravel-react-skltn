<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/fontawesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app-react-bs.css') }}" rel="stylesheet">
    <link href="{{ asset('css/theme.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app-react.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        @guest
            {{-- No navbar --}}
        @else
            <nav class="navbar navbar-default navbar-fixed-bottom">
                <div class="container-fluid">
                    <div class="navbar-header col-xs-10 col-sm-8">
                        <!-- Branding Image -->
                        <a class="navbar-brand" href="{{ url('/') }}">
                            <small>2017 &copy; {{ config('app.name', 'Laravel') }}</small>
                        </a>
                    </div>

                    <div class="nav navbar-nav navbar-right col-xs-2 col-sm-4 text-right pull-right">
                        <a href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                            Cerrar sesión
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </div>
            </nav>
        @endguest

        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
