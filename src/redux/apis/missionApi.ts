import Mission from "@/models/entities/Mission";
import appApi from "./appApi";

const baseUrlPath = "missions";

const missionApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getMissions: builder.query<Mission[], void>({
      query: () => baseUrlPath,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Mission", id } as const)),
          { type: "Mission", id: "LIST" },
        ]
        : [{ type: "Mission", id: "LIST" }],
    }),
    getMission: builder.query<Mission, number>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Mission", id }],
    }),
    updateMission: builder.mutation<void, Partial<Mission> & Pick<Mission, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Mission", id: body.id }],
    }),
    addMission: builder.mutation<Mission, Partial<Mission>>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Mission", id: "LIST" }],
    }),
    deleteMission: builder.mutation<void, number>({
      query: (id) => ({
        url: `${baseUrlPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Mission", id }],
    }),
  }),
});

export default missionApi;

export const {
  useGetMissionsQuery,
  useGetMissionQuery,
  useUpdateMissionMutation,
  useAddMissionMutation,
  useDeleteMissionMutation,
} = missionApi;
