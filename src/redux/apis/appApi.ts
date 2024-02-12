import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import reauthBaseQueryWrapper from "./reauthBaseQueryWrapper";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: reauthBaseQueryWrapper(axiosBaseQuery({ baseUrl: "http://localhost:5093/api/" })),
  tagTypes: ["Post", "DutyDate", "Militia", "Mission", "Rule", "Shift", "Task"],
  endpoints: (_builder) => ({}),
});

export default appApi;
