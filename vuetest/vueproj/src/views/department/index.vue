<template>
  <div>
    <h1>부서 관리</h1>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left">
          <b-button variant="primary" size="sm" @click="searchDepartmentList"
            >검색</b-button
          >
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" size="sm" @click="onClickAddNew"
            >신규등록</b-button
          >
        </b-col>
      </b-row>
    </div>
    <div>
      <b-table small hover striped :items="departmentList" :fields="fields">
        <template #cell(createdAt)="row">
          {{ row.item.createdAt.substring(0, 10) }}
        </template>
        <template #cell(updatedBtn)="row">
          <b-button
            size="sm"
            variant="success"
            @click="onClickEdit(row.item.id)"
            >수정</b-button
          >
        </template>
      </b-table>
    </div>
    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from "./inform.vue";

export default {
  components: {
    inform,
  },
  data() {
    return {
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "부서명" },
        { key: "code", label: "부서코드" },
        { key: "createdAt", label: "생성일" },
        { key: "updatedBtn", label: "수정" },
      ],
    };
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList;
    },
    insertedResult() {
      return this.$store.getters.DepartmentInsertedResult;
    },
    updatedResult() {
      return this.$store.getters.DepartmentUpdatedResult;
    },
  },
  watch: {
    insertedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("등록 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDepartmentList();
        } else {
          this.$bvToast.toast("등록이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
    updatedResult(value) {
      if (value !== null) {
        if (value > 0) {
          this.$bvToast.toast("등록 되었습니다.", {
            title: "SUCCESS",
            variant: "success",
            solid: true,
          });
          this.searchDepartmentList();
        } else {
          this.$bvToast.toast("수정이 실패하였습니다.", {
            title: "ERROR",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
  },
  created() {
    this.searchDepartmentList();
  },
  methods: {
    searchDepartmentList() {
      this.$store.dispatch("setDepartmentList", "searchDepartmentList");
    },
    onClickAddNew() {
      this.$bvModal.show("modal-department-inform");
      console.log("onClickAddNew()");
    },
    onClickEdit(id) {
      this.$store.dispatch("setDepartmentInputMode", "update");
      this.$store.dispatch("setDepartmentInfo", id);
      this.$bvModal.show("modal-department-inform");
    },
  },
};
</script>

<style scoped></style>
