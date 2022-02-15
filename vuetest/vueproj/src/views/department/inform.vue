<template>
  <div>
    <b-modal id="modal-department-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group
          v-if="inputMode === 'update'"
          label="id"
          label-for="id"
          label-cols="3"
        >
          <b-form-input id="id" v-model="department.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="부서이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="department.name"></b-form-input>
        </b-form-group>
        <b-form-group
          label="부서코드"
          label-for="code"
          label-cols="3"
          description="중복코드는 허용되지 않습니다."
        >
          <b-form-input id="code" v-model="department.code"></b-form-input>
        </b-form-group>
        <b-form-group label="상세설명" label-for="description" label-cols="3">
          <b-form-textarea
            id="description"
            v-model="department.description"
            rows="5"
          />
        </b-form-group>
        <b-form-group
          v-if="inputMode === 'update'"
          label="등록일"
          label-for="createdAt"
          label-cols="3"
        >
          <b-form-input
            id="createdAt"
            :value="getCreatedAt"
            disabled
          ></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: {
        id: null,
        name: null,
        code: null,
        description: null,
        createdAt: null,
      },
    };
  },
  computed: {
    infoData() {
      return this.$store.getters.Department;
    },
    inputMode() {
      return this.$store.getters.DepartmentInputMode;
    },
    getTitle() {
      let title = "";
      if (this.inputMode === "insert") {
        title = "부서정보 입력";
      } else if (this.inputMode === "update") {
        title = "부서정보 수정";
      }

      return title;
    },
    getCreatedAt() {
      return (
        this.department.createdAt && this.department.createdAt.substring(0, 10)
      );
    },
  },
  watch: {
    infoData(value) {
      this.department = { ...value };
    },
  },
  created() {
    this.department = { ...this.infoData };
  },
  methods: {
    onSubmit() {
      if (this.inputMode === "insert") {
        this.$store.dispatch("setDepartmentInsert", this.department);
      }

      if (this.inputMode === "update") {
        this.$store.dispatch("setDepartmentUpdate", this.department);
      }
    },
  },
};
</script>

<style scoped></style>
