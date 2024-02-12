import Militia from "@/models/entities/Militia";
import appApi from "./appApi";

const baseUrlPath = "militias";

const militiaApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getMilitias: builder.query<Militia[], void>({
      query: () => baseUrlPath,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Militia", id } as const)),
          { type: "Militia", id: "LIST" },
        ]
        : [{ type: "Militia", id: "LIST" }],
    }),
    getMilitia: builder.query<Militia, number>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Militia", id }],
    }),
    updateMilitia: builder.mutation<void, Partial<Militia> & Pick<Militia, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Militia", id: body.id }],
    }),
    addMilitia: builder.mutation<Militia, Partial<Militia>>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Militia", id: "LIST" }],
    }),
    deleteMilitia: builder.mutation<void, number>({
      query: (id) => ({
        url: `${baseUrlPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Militia", id }],
    }),
  }),
});

export default militiaApi;

export const {
  useGetMilitiasQuery,
  useGetMilitiaQuery,
  useUpdateMilitiaMutation,
  useAddMilitiaMutation,
  useDeleteMilitiaMutation,
} = militiaApi;
