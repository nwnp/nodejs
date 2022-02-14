<template>
  <div>
    <h1>v-for Test</h1>
    <h2>원본 출력</h2>
    <div>
      <div>{{ fruits }}</div>
      <div>{{ users }}</div>
    </div>
    <h2>다듬어서 출력</h2>
    <div>
      <h3>과일 리스트</h3>
      <ul>
        <li v-for="(fruit, index) in fruits" :key="`fruit-${index}`">
          {{ fruit }}
        </li>
        <h3>사용자 리스트</h3>
        <div v-for="(user, index) in users" :key="index">
          <span>{{ user.name }}: {{ user.age }}, {{ user.gender }}</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruits: ["apple", "orange", "banana", "mango"],
      users: [
        { name: "hong", age: 20, gender: "male" },
        { name: "kim", age: 20, gender: "female" },
        { name: "jin", age: 29, gender: "male" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
