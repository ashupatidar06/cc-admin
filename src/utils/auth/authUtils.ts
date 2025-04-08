import { authTokenKeyName, refreshTokenKeyName } from "../configs/authConfig";
import { showToast } from "../../utils/showToaster";

export const clearLocalStorage = () => {
  localStorage.removeItem(authTokenKeyName);
  localStorage.removeItem(refreshTokenKeyName);
  localStorage.removeItem("userData");
  localStorage.removeItem("isLogin");
  showToast("error", "Session expire")
};
