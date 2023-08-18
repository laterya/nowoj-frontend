import { defineStore } from "pinia";

interface UserState {
  userInfo: UserInfo;
}

interface UserInfo {
  userName: string;
  role: string;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    userInfo: { userName: "未登录", role: "未登录" },
  }),
  getters: {
    getLoginUser(): UserInfo {
      return this.userInfo;
    },
  },
  actions: {
    setLoginUser() {
      this.userInfo.userName = "laterya";
      this.userInfo.role = "admin";
    },
  },
});
