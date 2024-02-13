import DutyDate from "@/models/entities/DutyDate";
import Mission from "@/models/entities/Mission";
import { Paper, PaperProps, styled } from "@mui/material";
import MissionNameTable from "./MissionNameTable";
import ShiftDateTable from "./ShiftDateTable";

type ShiftTableProps = PaperProps & {
  missions: Mission[];
  dutyDates: DutyDate[];
}

const ShiftTable = styled(({ missions, dutyDates, ...props }: ShiftTableProps) => {
  return (
    <Paper {...props}>
      <MissionNameTable missions={missions} />
      <ShiftDateTable dutyDates={dutyDates} missions={missions} />
    </Paper>
  );
})(() => ({
  display: "flex",
}));

export default ShiftTable;
