import DayOfWeek from "../DayOfWeek";
import Militia from "./Militia";
import Task from "./Task";

export enum RuleType {
  DateOff,
  DutyDate,
  WeeklyDutyOnly,
  FullDuty,
  AlternatingDuty,
  IncludeTasks,
  ExcludeTasks,
  TaskImmune,
}

export const ruleTypeNameMap: Record<RuleType, string> = {
  [RuleType.DateOff]: "Nghỉ vào ngày",
  [RuleType.DutyDate]: "Trực vào ngày",
  [RuleType.WeeklyDutyOnly]: "Trực theo thứ",
  [RuleType.FullDuty]: "Trực full",
  [RuleType.AlternatingDuty]: "Thay phiên nhau trực",
  [RuleType.IncludeTasks]: "Có thể coi cổng",
  [RuleType.ExcludeTasks]: "Không thể coi cổng",
  [RuleType.TaskImmune]: "Không cần coi cổng",
};

type Rule = {
  id: number;
  startDate: string;
  endDate: string | null;
  type: RuleType;
  description: string | null;
  weeksdays: DayOfWeek[] | null;
  numberValue: number | null;
  militias: Militia[];
  tasks: Task[];
}

export default Rule;
