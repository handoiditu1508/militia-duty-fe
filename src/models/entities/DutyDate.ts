import Militia from "./Militia";
import Shift from "./Shift";

type DutyDate = {
  id: string;
  date: string;
  isFullDutyDate: boolean;
  militias: Militia[];
  shifts: Shift[];
}

export default DutyDate;
