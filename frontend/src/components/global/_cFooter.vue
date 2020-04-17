<template>
  <v-footer app inset>
    <small>
      &copy; {{ new Date() | moment("YYYY") }}
      <a
        href="http://afoxtech.com/"
        target="_blank"
      >{{appName}}</a>
    </small>
  </v-footer>
</template>