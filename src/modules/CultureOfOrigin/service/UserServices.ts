import apiSlice from "src/services/ApiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getUser: builder.query({
      providesTags: [],
      query: (body) => {
        return {
          url: "/user/pagination",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addUser: builder.mutation({
      invalidatesTags: [],
      query: (body) => {
        return {
          url: "/user/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useAddUserMutation } = userApi;
