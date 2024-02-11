import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import reauthBaseQueryWrapper from "./reauthBaseQueryWrapper";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: reauthBaseQueryWrapper(axiosBaseQuery({ baseUrl: "/api/" })),
  tagTypes: ["Post"],
  endpoints: (_builder) => ({}),
});

export default appApi;
