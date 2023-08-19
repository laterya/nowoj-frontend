import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 权限校验
 * @param userRole 当前登陆用户权限
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (
  userRole: string,
  needAccess: string = ACCESS_ENUM.NOT_LOGIN
): boolean => {
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 如果需要登陆才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    if (userRole === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 如果需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (userRole !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
