# laravel-react-skltn

Laravel + React WEB App Skeleton

This app implements a basic CRUD over three database tables:
* Roles
* Users
* Clients

The app has user authentication, and it's developed with Laravel 5.5 (Model + Controller) and ReactJS 16 (View).

# Installation

## Prerequisites
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
* [PHP](https://php.net/) >= 7.0.0
* [MySQL](https://dev.mysql.com/downloads/mysql/)
* [Composer](https://getcomposer.org/download/)
* [npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)

## Installation process
From your command line, go to the path or directory where you want to start the installation and follow these steps:

1. Clone the repository where the code is located:

    ```
    git clone https://github.com/riotxoa/laravel-react-skltn.git
    ```

2. Situate yourself in the new created route:

    ```
    cd laravel-react-skltn
    ```

3. Install dependencies:

    ```
    composer install
    ```

    ```
    npm install
    ```

4. Configure the .env file with your database settings:

    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=databasename <- Previously created
    DB_USERNAME=username
    DB_PASSWORD=********
    ```

5. Migrate datamodel:

    ```
    php artisan migrate
    ```

6. Seed the database (Roles, Users and Clients tables):

    ```
    php artisan db:seed --class=DatabaseTableSeeder
    ```

7. Before using Laravel's encrypter, you must set a key option in config/app.php configuration file:
    ```
    php artisan key:generate
    ```

# Running the aplication

    php artisan serve


Then browse to http://127.0.0.1:8000 and login in with these credentials:

    Username: root@example.com
    Password: secret

Enjoy! =)
