import { RuleType } from "@/models/entities/Rule";

type RuleMetaData = {
  type: RuleType;
  minimumMilitias: number;
  isShowWeekdays?: boolean;
  isShowNumberValue?: boolean;
  isShowTasks?: boolean;
}

export default RuleMetaData;
