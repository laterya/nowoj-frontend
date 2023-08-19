import { defineStore } from "pinia";

interface UserState {
  userInfo: UserInfo;
}

interface UserInfo {
  userName: string;
  userRole: string;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    userInfo: { userName: "未登录", userRole: "notLogin" },
  }),
  getters: {
    getLoginUser(): UserInfo {
      return this.userInfo;
    },
  },
  actions: {
    setLoginUser() {
      this.userInfo.userName = "laterya";
      this.userInfo.userRole = "user";
    },
  },
});
