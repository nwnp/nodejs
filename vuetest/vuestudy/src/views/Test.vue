<template>
  <div>
    <h1>binding test {{ title }}</h1>
    <div>영문: <input v-model="engText" /></div>
    <div>한글: <input v-model="korText" @input="typingKor" /></div>
    <div>
      <h3>바인딩 영문: {{ engText }}</h3>
      <h3>바인딩 한글: {{ korText }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      engText: "",
      korText: "",
    };
  },

  methods: {
    typingKore(e) {
      this.korText = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
