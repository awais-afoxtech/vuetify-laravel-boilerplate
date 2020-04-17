<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;
    public $mailTitle;
    public $view;
    public $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $title, $view, $data)
    {
        $this->user = $user;
        $this->mailTitle = $title;
        $this->view = $view;
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), 'Vuetify Laravel Boilerplate')->subject($this->mailTitle)->markdown('emails.mail');
        // return $this->from(env('EMAIL_SENDER', 'Pet Printed'))->subject($this->mailTitle)->view($this->view);
    }
}