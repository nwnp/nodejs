import api from "../apiUtil";

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
      // const testUserInfo = {
      //   id: payload,
      //   name: "test",
      //   username: "testUser",
      //   email: "test@email.com",
      // };
      // context.commit("setUser", testUserInfo);

      // REST API로부터 UserInfo 가져오기
      api
        .get(`https://jsonplaceholder.typicode.com/users/${payload}`)
        .then((res) => {
          console.log("res", res);
          const userInfo = res && res.data;
          context.commit("setUser", userInfo);
        });
    },
    actUserList(context, payload) {
      console.log("searchParams", payload);
      // const testUserList = ["user1", "user2", "user3"];
      // context.commit("setUserList", testUserList);

      api.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        console.log("res", res);
        const userList = res && res.data;
        context.commit("setUserList", userList);
      });
    },
  },
};
