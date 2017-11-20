<?php

namespace App;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;

class MyResetPassword extends ResetPasswordNotification
{
    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {

        return (new MailMessage)
            ->subject('[' . config('app.name') . '] Reiniciar contraseña')
            ->template('auth.passwords.email-reset-link')
            ->greeting('¡Hola!')
            ->line('Has recibido este email como respuesta a una petición de reinicio de contraseña realizada para tu cuenta.')
            ->action('Reiniciar Contraseña', url(config('app.url').route('password.reset', $this->token, false)))
            ->line('Si no has solicitado un reinicio de contraseña, ignora este mensaje.')
            ->salutation("Un saludo,");
    }
}
