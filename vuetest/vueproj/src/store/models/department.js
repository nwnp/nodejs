// import api from "../apiUtil";

const stateInit = {
  Department: {
    id: null,
    name: null,
    code: null,
    description: null,
    createdAt: null,
    updatedAt: null,
  },
};

export default {
  state: {
    DepartmentList: [],
    Department: { ...stateInit.Department },
    InsertedResult: null,
    UpdatedResult: null,
    InputMode: null,
  },
  getters: {
    DepartmentList: (state) => state.DepartmentList,
    Department: (state) => state.Department,
    DepartmentInsertedResult: (state) => state.InsertedResult,
    DepartmentUpdatedResult: (state) => state.UpdatedResult,
    DepartmentInputMode: (state) => state.InputMode,
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data;
    },
    setDepartment(state, data) {
      state.Department = data;
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data;
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data;
    },
    setInputMode(state, data) {
      state.InputMode = data;
    },
  },
  actions: {
    setDepartmentList(context, payload) {
      console.log(payload);
      const departmentList = [
        { id: 1, name: "개발팀", code: "dev", createdAt: "2021-12-01" },
        { id: 2, name: "영업팀", code: "sales", createdAt: "2021-12-01" },
      ];
      context.commit("setDepartmentList", departmentList);

      /** REST API 호출 */
      //   api.get("/serverApi/departments").then((res) => {
      //     const departmentList = res && res.data;
      //     context.commit("setDepartmentList", departmentList);
      //   });
    },

    setDepartmentInsert(context, payload) {
      console.log("setDepartmentInsert", payload, this.InsertedResult);
      context.commit("setInsertedResult", null);

      setTimeout(() => {
        const insertedResult = 1;
        context.commit("setInsertedResult", insertedResult);
      }, 300);

      /** REST API POST /serverApi/departments */
      // api.post("/serverApi/departments").then((res) => {
      //   const insertedResult = res && res.data;
      //   context.commit("setInsertedResult", insertedResult);
      // });
    },

    setDepartmentInit(context, payload) {
      console.log(payload);
      context.commit("setDepartment", { ...stateInit.Department });
    },

    setDepartmentInputMode(context, payload) {
      context.commit("setInputMode", payload);
    },

    setDepartmentInfo(context, payload) {
      context.commit("setDepartment", { ...stateInit.Department });

      setTimeout(() => {
        const departmentList = [
          {
            id: 1,
            name: "개발팀",
            code: "dev",
            description: "개발팀 테스트",
            createdAt: "2021-12-01",
          },
          {
            id: 2,
            name: "영업팀",
            code: "sales",
            description: "영업팀 테스트",
            createdAt: "2021-12-01",
          },
        ];

        let department = { ...stateInit.department };
        for (let i = 0; i < departmentList.length; i++) {
          if (payload === departmentList[i].id) {
            department = { ...departmentList[i] };
          }
        }
        context.commit("setDepartment", department);
      }, 300);

      // api.get(`/serverApi/departments/${payload}`).then((res) => {
      //   const department = res & res.data;
      //   context.commit("setDepartment", department);
      // });
    },

    setDepartmentUpdate(context, payload) {
      console.log(payload);
      context.commit("setUpdatedResult", null);

      setTimeout(() => {
        const updatedResult = 1;
        context.commit("setUpdatedResult", updatedResult);
      });

      // api.get(`/serverApi/departments/${payload}`).then((res) => {
      //   const updatedResult = res && res.data;
      //   context.commit("setUpdatedResult", updatedResult);
      // });
    },
  },
};
