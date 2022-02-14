<template>
  <div>
    <h3>Greeting to you, I am Bob</h3>
    <p>I have to {{ job }}</p>
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
  },
};
</script>

<style scoped></style>
