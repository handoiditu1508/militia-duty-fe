import CONFIG from "@/configs";
import { useGetDutyDatesQuery } from "@/redux/apis/dutyDateApi";
import { useGetMissionsQuery } from "@/redux/apis/missionApi";
import { Box } from "@mui/material";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ShiftTable from "./ShiftTable";

function ShiftsPage() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"));
  const isDateRangeValid = startDate.isBefore(endDate, "date") || startDate.isSame(endDate, "date");

  const {
    data: missions,
    isFetching: isFetchingMissions,
    isLoading: isLoadingMissions,
  } = useGetMissionsQuery();

  const {
    data: dutyDates,
    isFetching: isFetchingDutyDates,
    isLoading: isLoadingDutyDates,
  } = useGetDutyDatesQuery({
    startDate: startDate.add(1, "day").toISOString(),
    endDate: endDate.toISOString(),
  }, {
    skip: !isDateRangeValid,
  });

  const handleDateChange = (setValue: (value: Dayjs) => void) => (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (value && !context.validationError) {
      setValue(value);
    }
  };

  return (
    <Box padding={CONFIG.LAYOUT_PADDING}>
      <DatePicker label="Start" value={startDate} onChange={handleDateChange(setStartDate)} />
      <DatePicker label="End" value={endDate} onChange={handleDateChange(setEndDate)} />
      {missions && dutyDates && <ShiftTable missions={missions} dutyDates={dutyDates} />}
    </Box>
  );
}

export default ShiftsPage;
