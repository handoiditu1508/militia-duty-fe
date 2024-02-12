import Task from "@/models/entities/Task";
import appApi from "./appApi";

const baseUrlPath = "tasks";

const taskApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => baseUrlPath,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Task", id } as const)),
          { type: "Task", id: "LIST" },
        ]
        : [{ type: "Task", id: "LIST" }],
    }),
    getTask: builder.query<Task, number>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Task", id }],
    }),
    updateTask: builder.mutation<void, Partial<Task> & Pick<Task, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Task", id: body.id }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `${baseUrlPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Task", id }],
    }),
  }),
});

export default taskApi;

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
