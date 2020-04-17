@component('mail::message')

This is your code password Reset code. {{$data}}
Please Do not share this with anyone.

@component('mail::button', ['url' => ''])
Website
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
