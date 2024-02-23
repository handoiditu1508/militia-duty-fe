import DoDutyDatesRequest from "@/models/apis/requests/DoDutyDatesRequest";
import DutyDateFilter from "@/models/apis/requests/DutyDateFilter";
import UndoDutyDateRequest from "@/models/apis/requests/UndoDutyDateRequest";
import DutyDate from "@/models/entities/DutyDate";
import appApi from "./appApi";

const baseUrlPath = "dutydates";

const dutyDateApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDutyDates: builder.query<DutyDate[], DutyDateFilter>({
      query: (params) => ({
        url: baseUrlPath,
        params,
      }),
      transformResponse: (dutyDates: DutyDate[], _meta, _arg) => {
        return dutyDates.sort((d1, d2) => Date.parse(d1.date) - Date.parse(d2.date));
      },
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "DutyDate", id }) as const),
          { type: "DutyDate", id: "LIST" },
        ]
        : [{ type: "DutyDate", id: "LIST" }],
    }),
    getDutyDate: builder.query<DutyDate, string>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "DutyDate", id }],
    }),
    updateDutyDate: builder.mutation<void, Partial<DutyDate> & Pick<DutyDate, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "DutyDate", id: body.id }],
    }),
    addDutyDates: builder.mutation<DutyDate[], DoDutyDatesRequest>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "DutyDate", id }) as const),
          { type: "DutyDate", id: "LIST" },
          { type: "Militia", id: "LIST" },
        ]
        : [
          { type: "DutyDate", id: "LIST" },
          { type: "Militia", id: "LIST" },
        ],
    }),
    deleteDutyDates: builder.mutation<void, UndoDutyDateRequest>({
      query: (params) => ({
        url: baseUrlPath,
        method: "DELETE",
        params,
      }),
      invalidatesTags: [{ type: "DutyDate", id: "LIST" }],
    }),
  }),
});

export default dutyDateApi;

export const {
  useGetDutyDatesQuery,
  useGetDutyDateQuery,
  useUpdateDutyDateMutation,
  useAddDutyDatesMutation,
  useDeleteDutyDatesMutation,
} = dutyDateApi;
