import DutyDate from "@/models/entities/DutyDate";
import Mission from "@/models/entities/Mission";
import Task from "@/models/entities/Task";
import { Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, styled } from "@mui/material";
import dayjs from "dayjs";
import { Fragment, ReactNode, useMemo } from "react";

type ShiftDateTableProps = TableContainerProps & {
  dutyDates: DutyDate[];
  missions: Mission[];
}

const getDateString = (dateString: string): ReactNode => {
  const date = dayjs(dateString);
  return <>
    {date.format("ddd")}
    <br />
    {date.format("DD/MM/YYYY")}
  </>;
};

const ShiftDateTable = styled(({ dutyDates, missions, ...props }: ShiftDateTableProps) => {
  const tasks = useMemo<Task[]>(() => {
    const result: Task[] = [];

    missions.forEach(mission => {
      mission.tasks.forEach(task => {
        result.push(task);
      });
    });

    return result;
  }, [missions]);

  const shiftMap = useMemo<Record<string, string[]>>(() => {
    const result: Record<string, string[]> = {};

    tasks.forEach(task => {
      dutyDates.forEach(dutyDates => {
        const key = `${task.id}-${dutyDates.id}`;
        result[key] = dutyDates.shifts.filter(shift => shift.taskId === task.id).map(shift => shift.militia || "");
        if (!result[key].length) {
          result[key] = Array(task.militiaNumber).fill("");
        }
      });
    });

    return result;
  }, [tasks, dutyDates]);

  return (
    <TableContainer {...props}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {dutyDates.map((dutyDate) => <TableCell key={dutyDate.id}
              align="center"
            >
              {getDateString(dutyDate.date)}
            </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => <TableRow key={task.id} hover>
            {dutyDates.map((dutyDate) => <TableCell key={dutyDate.id}>
              {shiftMap[`${task.id}-${dutyDate.id}`].map((militiaName, index) => <Fragment key={index}>
                {militiaName}
                <br />
              </Fragment>)}
            </TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
})(({ theme }) => ({
  ".MuiTableCell-root": {
    "&:not(:first-of-type)": {
      borderLeft: theme.palette.mode === "light" ? "1px solid rgb(224, 224, 224)" : "1px solid rgb(81, 81, 81)",
    },
  },
}));

export default ShiftDateTable;
