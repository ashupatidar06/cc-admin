import apiSlice from "src/services/ApiSlice";

export const AboutUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getAboutUs: builder.query({
      providesTags: ["aboutus"],
      query: (body) => {
        return {
          url: "/about-us/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addAboutUs: builder.mutation({
      invalidatesTags: ["aboutus"],
      query: (body) => {
        return {
          url: "/about-us/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAboutUsQuery, useAddAboutUsMutation } = AboutUsApi;
