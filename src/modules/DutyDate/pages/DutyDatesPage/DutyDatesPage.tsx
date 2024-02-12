import CONFIG from "@/configs";
import { useGetDutyDatesQuery } from "@/redux/apis/dutyDateApi";
import { useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import { useGetMissionsQuery } from "@/redux/apis/missionApi";
import { Box, Button } from "@mui/material";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import DutyDateTable from "./DutyDateTable";



function DutyDatesPage() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"));
  const isDateRangeValid = startDate.isBefore(endDate, "date") || startDate.isSame(endDate, "date");
  const [startEditDate, setStartEditDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [endEditDate, setEndEditDate] = useState<Dayjs>(dayjs().endOf("week"));
  const isEditDateRangeValid = startEditDate.isBefore(endEditDate, "date") || startEditDate.isSame(endEditDate, "date");

  const {
    data: militias,
    isFetching: isFetchingMilitias,
    isLoading: isLoadingMilitias,
  } = useGetMilitiasQuery();

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
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }, {
    skip: !isDateRangeValid,
  });

  const handleDateChange = (setValue: (value: Dayjs) => void) => (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (value && !context.validationError) {
      setValue(value);
    }
  };

  const handleClick = () => {
    // todo: reassign tasks
  };

  return (
    <Box padding={CONFIG.LAYOUT_PADDING}>
      <DatePicker label="Start" value={startDate} onChange={handleDateChange(setStartDate)} />
      <DatePicker label="End" value={endDate} onChange={handleDateChange(setEndDate)} />
      <br />
      <br />
      <DatePicker label="Start Edit" value={startEditDate} onChange={handleDateChange(setStartEditDate)} />
      <DatePicker label="End Edit" value={endEditDate} onChange={handleDateChange(setEndEditDate)} />
      <Button onClick={handleClick} disabled={!isDateRangeValid}>Click</Button>
      {militias && dutyDates && <DutyDateTable militias={militias} dutyDates={dutyDates} sx={{ marginTop: 2 }} />}
    </Box>
  );
}

export default DutyDatesPage;
