<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const selectedKeys = ref(["/"]);

// 路由跳转后，更新所选菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push(key);
};

const store = useUserStore();

const loginClicked = () => {
  store.setLoginUser();
};

// 控制菜单栏的显示
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    // 需要隐藏的页面
    if (item?.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    return checkAccess(store.userInfo, item?.meta?.access as string);
  });
});
</script>

<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/pic2.jpg" alt="logo" />
            <div class="title">Now Oj</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div @click="loginClicked">{{ store.userInfo.userName }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
