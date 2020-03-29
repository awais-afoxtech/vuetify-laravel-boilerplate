<template>
  <v-icon :color="color != null ? color : ''">mdi-{{icon}}</v-icon>
</template>

<script>
export default {
  props: {
    color: {
      required: false,
      type: String,
      default: null
    },
    icon: {
      required: false,
      type: String,
      default: "image"
    }
  }
};
</script>