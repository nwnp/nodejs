<template>
  <div>
    <h3>Hi, I am Alice</h3>
    <p>I want my parent to give me money</p>
    <b-button variant="primary" @click="updateTodo">Money</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    updateTodo: function () {
      this.$emit("updateTodo", "give to Alice money");
    },
  },
};
</script>

<style scoped></style>
