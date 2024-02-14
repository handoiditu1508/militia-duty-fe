import { RuleType } from "@/models/entities/Rule";

type RuleMetaData = {
  type: RuleType;
  minimumMilitias: number;
  isShowWeeksdays?: boolean;
  isShowNumberValue?: boolean;
  isShowTasks?: boolean;
}

export default RuleMetaData;
