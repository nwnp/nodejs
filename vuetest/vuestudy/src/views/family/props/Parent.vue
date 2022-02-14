<template>
  <div>
    <h1>Props Test</h1>
    <h2>I am Parent</h2>
    <p>I will make me children do something</p>
    <div style="border: 1px; solid red">
      <alice job="homework" :user="myAlice" />
    </div>
    <div style="border: 1px; solid blue">
      <bob job="clean my room" />
    </div>
  </div>
</template>

<script>
import Alice from "./Child1.vue";
import Bob from "./Child2.vue";

export default {
  components: {
    alice: Alice,
    bob: Bob,
  },
  data() {
    return {
      myAlice: {
        name: "Alice",
        who: "My daughter",
      },
    };
  },
};
</script>

<style scoped></style>
