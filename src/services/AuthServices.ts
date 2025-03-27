import apiSlice from "./ApiSlice";
import { v4 as uuid } from "uuid";

const deviceId = localStorage.getItem("deviceId") || uuid();

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body: {
        // companyCode: string;
        email: string;
        password: string;
      }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: any) => {
        return { ...response, data: { ...response?.data, deviceId } };
      },
    }),

    // Get Access Token
    getAccessToken: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/refresh",
          method: "POST",
          body,
        };
      },
    }),

    // Change Password
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/user-change-password",
          method: "PUT",
          body,
        };
      },
    }),
    uploadFile: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/auth/upload`,
          method: "POST",
          body,
        };
      },
    }),
    addSwipeCards: builder.mutation({
      query: ({ body }) => {
        return {
          url: `/swipe-cards/add`,
          method: "POST",
          body,
        };
      },
    }),
    fileGetData: builder.query({
      query: () => {
        return {
          url: `/swipe-cards/get-data`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAccessTokenMutation,
  useChangePasswordMutation,
  useUploadFileMutation,
  useFileGetDataQuery,
  useAddSwipeCardsMutation
  
} = authApi;
