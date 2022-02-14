<template>
  <div>
    <app-header />
    <h1>Component Test</h1>
    여기는 Body 영역
    <app-footer />
  </div>
</template>

<script>
import Header from "@/views/comp/Header.vue";
import Footer from "@/views/comp/Footer.vue";

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style scoped></style>
