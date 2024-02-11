import Post from "@/models/entities/Post";
import appApi from "./appApi";

const postApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query<Post, number>({
      query: (id) => ({
        url: `posts/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Post", id } as const)),
          { type: "Post", id: "LIST" },
        ]
        : [{ type: "Post", id: "LIST" }],
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: (body) => ({
        url: `posts/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Post", id: body.id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: number; }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
  }),
});

export default postApi;

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;

