import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import HideView from "@/views/HideView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题目浏览",
    component: HomeView,
  },
  {
    path: "/hide",
    name: "用户登陆可见",
    component: HideView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/admin",
    name: "管理员界面",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
