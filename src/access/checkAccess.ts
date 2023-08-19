import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 权限校验
 * @param loginUser 当前登陆用户
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  loginUser: any,
  needAccess = ACCESS_ENUM.NOT_LOGIN
): boolean => {
  // 获取当前用户具有的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要登陆才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
