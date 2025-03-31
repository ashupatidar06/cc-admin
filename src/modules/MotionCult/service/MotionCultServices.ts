import apiSlice from "src/services/ApiSlice";

export const MotionCultApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Pagination
    getMotionCult: builder.query({
      providesTags: ["motioncult"],
      query: (body) => {
        return {
          url: "/motion-cult/get-data",
          method: "GET",
          params: body,
        };
      },
    }),

    // Add
    addMotionCult: builder.mutation({
      invalidatesTags: ["motioncult"],
      query: (body) => {
        return {
          url: "/motion-cult/add",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetMotionCultQuery, useAddMotionCultMutation } = MotionCultApi;
