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
