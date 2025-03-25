import apiSlice from "../services/ApiSlice";
import {
  setAccessToken,
  setIsLogin,
  setRefreshToken,
  setUserData,
} from "../slices/AuthSlice";
import { clearLocalStorage } from "../utils/auth/authUtils";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../utils/configs/authConfig";

const apiSliceType: any = apiSlice;
export const authMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  console.log(result.error, result?.payload?.status, "-----------------")
  if (result.error && result?.payload?.status === 401) {

    clearLocalStorage();
    window.location.replace("/login");


  }
  return result;
};
