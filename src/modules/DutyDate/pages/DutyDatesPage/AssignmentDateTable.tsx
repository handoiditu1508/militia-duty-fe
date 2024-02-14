import DutyDate from "@/models/entities/DutyDate";
import Militia from "@/models/entities/Militia";
import { Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, alpha, styled } from "@mui/material";
import classNames from "classnames";
import dayjs from "dayjs";
import { ReactNode } from "react";

type AssignmentDateTableProps = TableContainerProps & {
  militias: Militia[];
  dutyDates: DutyDate[];
}

const getDateString = (dateString: string): ReactNode => {
  const date = dayjs(dateString);
  return <>
    {date.format("ddd")}
    <br />
    {date.format("DD/MM/YYYY")}
  </>;
};

const AssignmentDateTable = styled(({ militias, dutyDates, ...props }: AssignmentDateTableProps) => {
  return (
    <TableContainer {...props}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {dutyDates.map((dutyDate) => <TableCell key={dutyDate.id}
              align="center"
              className={classNames({ "full-duty": dutyDate.isFullDutyDate })}
            >
              {getDateString(dutyDate.date)}
            </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {militias.map((militia) => <TableRow key={militia.id} hover>
            {dutyDates.map((dutyDate) => <TableCell key={dutyDate.id}
              align="center"
              className={classNames({ "full-duty": dutyDate.isFullDutyDate })}
            >
              {dutyDate.militias.some(m => m.id === militia.id) || dutyDate.isFullDutyDate ? "\u00A0" : "X"}
            </TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
})(({ theme }) => ({
  // maxHeight: 700,
  overflowX: "scroll",
  ".MuiTableCell-root": {
    "&:not(:first-of-type)": {
      borderLeft: theme.palette.mode === "light" ? "1px solid rgb(224, 224, 224)" : "1px solid rgb(81, 81, 81)",
    },
    "&.full-duty": {
      backgroundColor: alpha(theme.palette.warning.main, 0.3),
    },
  },
}));

export default AssignmentDateTable;
