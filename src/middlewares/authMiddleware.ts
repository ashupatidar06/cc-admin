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

  if (result.error && result?.payload?.status === 401) {
    store
      .dispatch(
        apiSliceType.endpoints.getAccessToken.initiate({
          refreshToken: store.getState()?.auth?.refreshToken,
        })
      )
      .then((res: any) => {
        console.log("res: ", res);
        if (res?.error) {
          // clearLocalStorage();
          // window.location.replace("/login");
        } else {
          const userData = {
            userName: res?.data?.data?.user?.userName,
            name: res?.data?.data?.user?.name,
            userId: res?.data?.data?.user?._id,
            userType: res?.data?.data?.user?.userType,
            email: res?.data?.data?.user?.email,
            // mobile: res?.data?.data?.user?.mobile,
          };

          store?.dispatch(setUserData(userData));
          store?.dispatch(setIsLogin(true));
          store?.dispatch(setAccessToken(res?.data?.data?.accessToken));
          store?.dispatch(setRefreshToken(res?.data?.data?.refreshToken));
          localStorage.setItem(authTokenKeyName, res?.data?.data?.accessToken);
          localStorage.setItem(
            refreshTokenKeyName,
            res?.data?.data?.refreshToken
          );

          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
  }
  return result;
};
