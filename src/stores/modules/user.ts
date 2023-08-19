import { defineStore } from "pinia";
import {
  UserControllerService,
  UserLoginRequest,
  UserVO,
} from "../../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserVO => ({
    createTime: undefined,
    id: 0,
    userAvatar: undefined,
    userName: undefined,
    userProfile: undefined,
    userRole: ACCESS_ENUM.NOT_LOGIN,
  }),
  getters: {},
  actions: {
    setLoginUser(userVo: UserVO) {
      const { userName, userRole, id, userProfile, userAvatar, createTime } =
        userVo;
      this.userName = userName;
      this.userRole = userRole;
      this.userAvatar = userAvatar;
      this.userProfile = userProfile;
      this.createTime = createTime;
      this.id = id;
    },
    // 实现自动登陆原理: 从本地存储中获取 cooke，然后调用后端接口进行验证
    async getLoginUser() {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        this.setLoginUser(res.data as UserVO);
      }
    },
    async logout() {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        this.setLoginUser({
          createTime: undefined,
          id: 0,
          userAvatar: undefined,
          userName: undefined,
          userProfile: undefined,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
});
