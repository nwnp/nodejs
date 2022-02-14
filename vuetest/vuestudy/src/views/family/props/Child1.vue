<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>I have to {{ job }}</p>
    <p>{{ user.name }} {{ user.who }}</p>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: String,
      required: false,
      default: "Nothing",
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped></style>
