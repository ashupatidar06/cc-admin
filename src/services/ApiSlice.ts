import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants/index";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    // credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as any)?.auth?.accessToken;
      const deviceId = localStorage.getItem("deviceId");

      // if (token && endpoint !== "getAccessModules") {
      //   headers.set("authorization", token);
      // }
      if (token && endpoint !== "getAccessModules") {
        headers.set("Authorization", `Bearer ${token}`);
      }
      if (deviceId) {
        headers.set("device-id", endpoint !== "logoutFromAll" ? deviceId : "");
      }
      return headers;
    },
  }),
  tagTypes: ["admin-user", "category", "sub-category", "inquiry", "com", "coo", "aboutus", "motioncult", "story", "explore"],
  endpoints: () => ({}),
});

export default apiSlice;
