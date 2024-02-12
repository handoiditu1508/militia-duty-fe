import Rule from "@/models/entities/Rule";
import appApi from "./appApi";

const baseUrlPath = "rules";

const ruleApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRules: builder.query<Rule[], void>({
      query: () => baseUrlPath,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: "Rule", id } as const)),
          { type: "Rule", id: "LIST" },
        ]
        : [{ type: "Rule", id: "LIST" }],
    }),
    getRule: builder.query<Rule, number>({
      query: (id) => `${baseUrlPath}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Rule", id }],
    }),
    updateRule: builder.mutation<void, Partial<Rule> & Pick<Rule, "id">>({
      query: (body) => ({
        url: `${baseUrlPath}/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, body) => [{ type: "Rule", id: body.id }],
    }),
    addRule: builder.mutation<Rule, Partial<Rule>>({
      query: (body) => ({
        url: baseUrlPath,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Rule", id: "LIST" }],
    }),
    deleteRule: builder.mutation<void, number>({
      query: (id) => ({
        url: `${baseUrlPath}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Rule", id }],
    }),
  }),
});

export default ruleApi;

export const {
  useGetRulesQuery,
  useGetRuleQuery,
  useUpdateRuleMutation,
  useAddRuleMutation,
  useDeleteRuleMutation,
} = ruleApi;
