import Shift from "@/models/entities/Shift";
import appApi from "./appApi";

const baseUrlPath = "shifts";

const shiftApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getShifts: builder.query<Shift[], void>({
      query: () => baseUrlPath,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Shift", id } as const)),
          { type: "Shift", id: "LIST" },
        ]
        : [{ type: "Shift", id: "LIST" }],
    }),
    getShift: builder.query<Shift, number>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Shift", id }],
    }),
    updateShift: builder.mutation<void, Partial<Shift> & Pick<Shift, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Shift", id: body.id }],
    }),
    addShift: builder.mutation<Shift, Partial<Shift>>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Shift", id: "LIST" }],
    }),
    deleteShift: builder.mutation<void, number>({
      query: (id) => ({
        url: `${baseUrlPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Shift", id }],
    }),
  }),
});

export default shiftApi;

export const {
  useGetShiftsQuery,
  useGetShiftQuery,
  useUpdateShiftMutation,
  useAddShiftMutation,
  useDeleteShiftMutation,
} = shiftApi;
