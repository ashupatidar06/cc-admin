import apiSlice from "src/services/ApiSlice";

export const CooApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getCoo: builder.query({
      providesTags: ["coo"],
      query: (body) => {
        return {
          url: "/coo/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addCoo: builder.mutation({
      invalidatesTags: ["coo"],
      query: (body) => {
        return {
          url: "/coo/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetCooQuery, useAddCooMutation } = CooApi;
