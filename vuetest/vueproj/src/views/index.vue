<template>
  <div>
    <div class="separate-body"></div>
    <b-container fluid style="padding-left: 0px">
      <b-row>
        <b-col cols="2" style="padding-right: 0px">
          <app-sidebar />
        </b-col>
        <b-col style="padding-left: 0px; padding-right: 0px">
          <div class="content-body">
            <router-view />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar.vue";

export default {
  components: {
    "app-sidebar": Sidebar,
  },
};
</script>
