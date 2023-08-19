import router from "@/router";
import { useUserStore } from "@/stores/modules/user";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 进入每个页面前的校验工作
 */
router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  // 如果用户未登陆，尝试自动登陆
  if (store.userRole === ACCESS_ENUM.NOT_LOGIN) {
    // 加 await 是为了等待登陆完成之后再进行下一步
    await store.getLoginUser();
  }
  // 获取所要访问页面的权限
  const needAccess = (to?.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果用户未登陆，跳转到登陆页面
    if (store.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next({ path: "/user/login" });
    }
    // 如果用户权限不足，跳转到无权限页面
    if (
      needAccess === ACCESS_ENUM.ADMIN &&
      store.userRole !== ACCESS_ENUM.ADMIN
    ) {
      next({ path: "/noAuth" });
    }
  }
  next();
});
