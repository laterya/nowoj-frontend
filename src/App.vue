<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const store = useUserStore();

router.beforeEach((to, from, next) => {
  // 管理员权限校验
  if (to.meta?.access === "canAdmin") {
    if (store.userInfo.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
