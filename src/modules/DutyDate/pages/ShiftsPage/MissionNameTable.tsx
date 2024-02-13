import Mission from "@/models/entities/Mission";
import { Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableRow, styled } from "@mui/material";
import { Fragment } from "react";

type MissionNameTableProps = TableContainerProps & {
  missions: Mission[];
}

const minutesToHourString = (minutes: number) => {
  const miliseconds = minutes * 60000;
  const date = new Date(miliseconds);
  return date.toTimeString().slice(0, 5);
};

const MissionNameTable = styled(({ missions, ...props }: MissionNameTableProps) => {
  return (
    <TableContainer {...props}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((mission) => (
            <Fragment key={mission.id}>
              {mission.tasks.map((task, index, list) => (
                <TableRow key={task.id}>
                  {index === 0 && <TableCell rowSpan={list.length} className="mission-name">{mission.name}</TableCell>}
                  <TableCell>
                    {minutesToHourString(task.startMinute)} - {minutesToHourString(task.endMinute)}
                    {[...Array(task.militiaNumber)].map((_, index) => <br key={index} />)}
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
})(() => ({
  maxWidth: 200,
  ".MuiTableCell-root": {
    "&.MuiTableCell-head": {
      height: 48,
    },
    "&.mission-name": {
      maxWidth: 50,
    },
  },
}));

export default MissionNameTable;
