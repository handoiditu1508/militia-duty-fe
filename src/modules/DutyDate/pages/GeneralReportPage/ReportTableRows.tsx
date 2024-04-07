import { minutesToHourString } from "@/common/formats";
import DutyDate from "@/models/entities/DutyDate";
import Militia from "@/models/entities/Militia";
import { useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import { useGetMissionsQuery } from "@/redux/apis/missionApi";
import { TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { ReactNode, useEffect, useMemo, useState } from "react";

const dayMap: Record<string, string> = {
  Sun: "Chủ Nhật",
  Mon: "Thứ Hai",
  Tue: "Thứ Ba",
  Wed: "Thứ Tư",
  Thu: "Thứ Năm",
  Fri: "Thứ Sáu",
  Sat: "Thứ Bảy",
};

type ReportTableRowsProps = {
  dutyDate: DutyDate;
}

function ReportTableRows({ dutyDate, ...props }: ReportTableRowsProps) {
  const [militias, setMilitias] = useState<Militia[]>(dutyDate.militias);

  const {
    data: missions,
    isFetching: isFetchingMissions,
    isLoading: isLoadingMissions,
  } = useGetMissionsQuery();

  const {
    data: allMilitias,
  } = useGetMilitiasQuery(undefined, {
    skip: !dutyDate.isFullDutyDate,
  });

  var militiaMap = useMemo<Record<number, Militia>>(() => {
    return militias.reduce<Record<number, Militia>>((result, value) => {
      result[value.id] = value;
      return result;
    }, {});
  }, [militias]);

  var taskMilitiaMap = useMemo<Record<number, Militia[]>>(() => {
    var result: Record<number, Militia[]> = { 0: [] };
    var militiaCheck: Set<number> = new Set();

    if (missions) {
      missions.forEach(mission => {
        mission.tasks.forEach(task => {
          result[task.id] = [];
        });
      });

      dutyDate.shifts.forEach(shift => {
        result[shift.taskId].push(militiaMap[shift.militiaId]);
        militiaCheck.add(shift.militiaId);
      });

      militias.forEach(militia => {
        if (!militiaCheck.has(militia.id)) {
          result[0].push(militia);
          militiaCheck.add(militia.id);
        }
      });
    }

    return result;
  }, [militias, dutyDate.shifts, militiaMap, missions]);

  useEffect(() => {
    if (dutyDate.isFullDutyDate && allMilitias && allMilitias.length) {
      setMilitias(allMilitias);
    } else {
      setMilitias(dutyDate.militias);
    }
  }, [allMilitias, dutyDate.isFullDutyDate, dutyDate.militias]);

  const getDateString = (dateString: string): ReactNode => {
    const date = dayjs(dateString);
    return `${dayMap[date.format("ddd")]} ${date.format("DD/MM/YYYY")}`;
  };

  return (
    <>
      {missions && missions.map(
        (mission, missionIndex) => mission.tasks.map(
          (task, taskIndex) => taskMilitiaMap[task.id].map(
            (militia, militiaIndex) => (
              militia && <TableRow key={militia.id}>
                {missionIndex === 0 && taskIndex === 0 && militiaIndex === 0 && <TableCell rowSpan={militias.length}>{getDateString(dutyDate.date)}</TableCell>}
                {militiaIndex === 0 && <TableCell rowSpan={taskMilitiaMap[task.id].length}>{minutesToHourString(task.startMinute)} - {minutesToHourString(task.endMinute)}</TableCell>}
                <TableCell>{militia.fullName}</TableCell>
                <TableCell>{"\u00A0"}{militia.phoneNumber}</TableCell>
              </TableRow>
            )
          )
        )
      )}
      {taskMilitiaMap[0].map((militia, militiaIndex, array) => (
        <TableRow key={militia.id}>
          {militiaIndex === 0 && <TableCell rowSpan={array.length} />}
          <TableCell>{militia.fullName}</TableCell>
          <TableCell>{"\u00A0"}{militia.phoneNumber}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default ReportTableRows;
