import DutyDate from "@/models/entities/DutyDate";
import Militia from "@/models/entities/Militia";
import { Paper, PaperProps, styled } from "@mui/material";
import { useRef } from "react";
import AssignmentDateTable from "./AssignmentDateTable";
import NameTable from "./NameTable";

type DutyDateTableProps = PaperProps & {
  militias: Militia[];
  dutyDates: DutyDate[];
}

const DutyDateTable = styled(({ militias, dutyDates, ...props }: DutyDateTableProps) => {
  const nameTableRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const handleAssignmentTableScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    nameTableRef.current.scrollTop = (event.target as HTMLDivElement).scrollTop;
  };

  return (
    <Paper {...props}>
      <NameTable militias={militias} ref={nameTableRef} />
      <AssignmentDateTable militias={militias} dutyDates={dutyDates} onScroll={handleAssignmentTableScroll} />
    </Paper>
  );
})(() => ({
  display: "flex",
}));

export default DutyDateTable;
