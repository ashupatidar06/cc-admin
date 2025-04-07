import apiSlice from "src/services/ApiSlice";

export const exploreApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getexplore: builder.query({
      providesTags: ["explore"],
      query: (body) => {
        return {
          url: "/explore/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addexplore: builder.mutation({
      invalidatesTags: ["explore"],
      query: (body) => {
        return {
          url: "/explore/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetexploreQuery, useAddexploreMutation } = exploreApi;
