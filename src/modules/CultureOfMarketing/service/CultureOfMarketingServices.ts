import apiSlice from "src/services/ApiSlice";

export const ComApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getCom: builder.query({
      providesTags: ["com"],
      query: (body) => {
        return {
          url: "/com/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addCom: builder.mutation({
      invalidatesTags: ["com"],
      query: (body) => {
        return {
          url: "/com/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetComQuery, useAddComMutation } = ComApi;
