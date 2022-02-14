<template>
  <div>
    <h1>Store Test</h1>
    <div>
      <h3>User Info</h3>
      <b-container fluid>
        <b-row>
          <b-col style="text-align: right">User.id</b-col>
          <b-col style="test-align: center">
            <b-form-input
              v-model="id"
              placeholder="User.id를 검색하세요.(1~10)"
            ></b-form-input>
          </b-col>
          <b-col style="text-align: left">
            <b-button variant="primary" @click="searchUserInfo"
              >Get User Info</b-button
            >
          </b-col>
        </b-row>
      </b-container>
      <div style="border: 1px sold red">
        {{ userInfo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.User;
    },
  },
  methods: {
    searchUserInfo() {
      this.$store.dispatch("actUserInfo", this.id);
    },
  },
};
</script>

<style scoped></style>
