import CONFIG from "@/configs";
import { useGetDutyDatesQuery } from "@/redux/apis/dutyDateApi";
import { useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ReportTableRows from "./ReportTableRows";

type FormInputs = {
  startDate: Dayjs;
  endDate: Dayjs;
}

function GeneralReportPage() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"));
  const isDateRangeValid = startDate.isBefore(endDate, "date") || startDate.isSame(endDate, "date");

  const {
    data: militias,
    isFetching: isFetchingMilitias,
    isLoading: isLoadingMilitias,
  } = useGetMilitiasQuery();

  const {
    data: dutyDates,
    isFetching: isFetchingDutyDates,
    isLoading: isLoadingDutyDates,
  } = useGetDutyDatesQuery({
    startDate: startDate.utc(true).toISOString(),
    endDate: endDate.utc(true).toISOString(),
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
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>NGÀY</TableCell>
              <TableCell>TRỰC CỔNG</TableCell>
              <TableCell>TÊN</TableCell>
              <TableCell>SĐT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dutyDates && dutyDates.map(dutyDate => <ReportTableRows
              key={dutyDate.id}
              dutyDate={dutyDate}
            />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GeneralReportPage;
