import apiSlice from "src/services/ApiSlice";

export const storyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getstory: builder.query({
      providesTags: ["story"],
      query: (body) => {
        return {
          url: "/story/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addstory: builder.mutation({
      invalidatesTags: ["story"],
      query: (body) => {
        return {
          url: "/story/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetstoryQuery, useAddstoryMutation } = storyApi;
