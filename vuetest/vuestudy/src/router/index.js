import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/test-event",
    name: "TestEvent",
    component: () => import("../views/TestEvent.vue"),
  },
  {
    path: "/test-computed",
    name: "TestComputed",
    component: () => import("../views/TestComputed.vue"),
  },
  {
    path: "/test-condition",
    name: "TestCondition",
    component: () => import("../views/TestCondition.vue"),
  },
  {
    path: "/test-loop",
    name: "TestLoop",
    component: () => import("../views/TestLoop.vue"),
  },
  {
    path: "/test-bootstrap",
    name: "TestBootstap",
    component: () => import("../views/TestBootstrap.vue"),
  },
  {
    path: "/test-comp",
    component: () => import("../views/comp"),
  },
  {
    path: "/test-family/props",
    component: () => import("../views/family/props/Parent.vue"),
  },
  {
    path: "/test-family/emit",
    component: () => import("../views/family/emit/Parent.vue"),
  },
  {
    path: "/test-user/list",
    component: () => import("../views/user/UserList.vue"),
  },
  {
    path: "/test-user/info",
    component: () => import("../views/user/UserInfo.vue"),
  },
  {
    path: "*",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
