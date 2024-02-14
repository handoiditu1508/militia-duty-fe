import { RuleType } from "@/models/entities/Rule";
import RuleMetaData from "../../models/RuleMetaData";

const ruleMetaDatas: Record<RuleType, RuleMetaData> = {
  [RuleType.DateOff]: {
    type: RuleType.DateOff,
    minimumMilitias: 1,
  },
  [RuleType.DutyDate]: {
    type: RuleType.DutyDate,
    minimumMilitias: 1,
  },
  [RuleType.WeeklyDutyOnly]: {
    type: RuleType.WeeklyDutyOnly,
    minimumMilitias: 1,
    isShowWeeksdays: true,
  },
  [RuleType.FullDuty]: {
    type: RuleType.FullDuty,
    minimumMilitias: 1,
  },
  [RuleType.AlternatingDuty]: {
    type: RuleType.AlternatingDuty,
    minimumMilitias: 2,
  },
  [RuleType.IncludeTasks]: {
    type: RuleType.IncludeTasks,
    minimumMilitias: 1,
    isShowTasks: true,
  },
  [RuleType.ExcludeTasks]: {
    type: RuleType.ExcludeTasks,
    minimumMilitias: 1,
    isShowTasks: true,
  },
  [RuleType.TaskImmune]: {
    type: RuleType.TaskImmune,
    minimumMilitias: 1,
  },
};

export default ruleMetaDatas;
