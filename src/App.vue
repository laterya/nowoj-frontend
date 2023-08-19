<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const doInit = () => {
  console.log("Hello! Now Oj");
};

onMounted(() => {
  doInit();
});

const router = useRouter();
const store = useUserStore();

router.beforeEach((to, from, next) => {
  // 管理员权限校验
  if (to.meta?.access === "admin") {
    if (store.userInfo.userRole !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
