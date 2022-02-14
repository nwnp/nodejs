<template>
  <div>
    <h1>v-if, v-show Test</h1>
    <button @click="error = !error">Toogle error</button>
    <button @click="success = !success">Toogle success</button>
    <div>
      <h3>v-if</h3>
      <div>
        <p>현재 error 상태는?</p>
        <p v-if="error" class="errBox">에러입니다.</p>
        <p v-else>에러 상태가 아닙니다.</p>
      </div>
      <h3>v-show</h3>
      <div>
        <p>현재 success 상태는?</p>
        <p v-show="success" class="sucBox">성공입니다.</p>
        <p v-show="!success">성공 상태가 아닙니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      success: false,
    };
  },
};
</script>

<style scoped>
.errBox {
  background: red;
  color: white;
}
.sucBox {
  background: green;
  color: white;
}
</style>
