<template>
  <div>
    <h1>Store Test</h1>
    <div>
      <h3>User List</h3>
      <b-button variant="primary" @click="searchUserList">Search</b-button>
      <div style="border: 1px solid red">
        {{ userList }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParams: null,
    };
  },
  computed: {
    userList() {
      return this.$store.getters.UserList;
    },
  },
  methods: {
    searchUserList() {
      this.$store.dispatch("actUserList", this.searchParams);
    },
  },
};
</script>

<style scoped></style>
