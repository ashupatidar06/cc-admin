import apiSlice from "src/services/ApiSlice";

export const inquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getInquiry: builder.query({
      providesTags: ["inquiry"],
      query: (body) => {
        return {
          url: "/contact-us/pagination",
          method: "GET",
          params: body,
        };
      },
    }),

    // Pagination
    getInquiryById: builder.query({
      providesTags: ["inquiry"],
      query: ({ id }) => {
        return {
          url: `/contact-us/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetInquiryQuery, useGetInquiryByIdQuery } = inquiryApi;
