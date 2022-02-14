<template>
  <div>
    <h3>Greeting to you, I am Bob</h3>
    <p>I want my parent to give me food</p>
    <b-button variant="success" @click="updateTodo">Food</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    updateTodo: function () {
      this.$emit("updateTodo", "feed Bob food");
    },
  },
};
</script>

<style scoped></style>
