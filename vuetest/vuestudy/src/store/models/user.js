export default {
  state: {
    User: {
      id: 0,
      name: null,
      username: null,
      email: null,
    },
    UserList: [],
  },
  getters: {
    User: (state) => state.User,
    UserList: (state) => state.UserList,
  },
  mutations: {
    setUser(state, data) {
      state.UserList = data;
    },
    setUserList(state, data) {
      state.User = data;
    },
  },
  actions: {
    actUserInfo(context, payload) {
      console.log("User.id", payload);
      const testUserInfo = {
        id: payload,
        name: "test",
        username: "testUser",
        email: "test@email.com",
      };
      context.commit("setUser", testUserInfo);
    },
    actUserList(context, payload) {
      console.log("searchParams", payload);
      const testUserList = ["user1", "user2", "user3"];
      context.commit("setUserList", testUserList);
    },
  },
};
