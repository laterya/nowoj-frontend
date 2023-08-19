<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
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
  console.log("loginClicked");
};

// 控制菜单栏的显示
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    // 需要隐藏的页面
    if (item?.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    return checkAccess(store.userRole as string, item?.meta?.access as string);
  });
});

// 头像点击控制
const handleSelect = (e: any) => {
  console.log(e);
  if (e === "0") router.push("/user/login");
  else if (e === "1") router.push("/user/register");
  else if (e === "2") router.push("/about");
  else if (e === "3") {
    store.logout();
    router.push("/");
  }
};
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
      <a-dropdown @select="handleSelect">
        <a-avatar>
          <img alt="avatar" :src="store.userAvatar" />
        </a-avatar>
        <template #content v-if="store.userName === undefined">
          <a-doption value="0">立即登陆</a-doption>
          <a-doption value="1">开始注册</a-doption>
        </template>
        <template #content v-else>
          <a-doption value="2">关于我的</a-doption>
          <a-doption value="3">退出登陆</a-doption>
        </template>
      </a-dropdown>
      <div @click="loginClicked">{{ store.userName }}</div>
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
