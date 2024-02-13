import CONFIG from "@/configs";
import { useAddDutyDatesMutation, useGetDutyDatesQuery } from "@/redux/apis/dutyDateApi";
import { useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DutyDateTable from "./DutyDateTable";

type FormInputs = {
  startDate: Dayjs;
  endDate: Dayjs;
  isFullDutyDate: boolean;
}

function DutyDatesPage() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("week"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("week"));
  const isDateRangeValid = startDate.isBefore(endDate, "date") || startDate.isSame(endDate, "date");
  // const [startEditDate, setStartEditDate] = useState<Dayjs>(dayjs().startOf("week"));
  // const [endEditDate, setEndEditDate] = useState<Dayjs>(dayjs().endOf("week"));
  // const isEditDateRangeValid = startEditDate.isBefore(endEditDate, "date") || startEditDate.isSame(endEditDate, "date");

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
    startDate: startDate.add(1, "day").toISOString(),
    endDate: endDate.toISOString(),
  }, {
    skip: !isDateRangeValid,
  });

  const [
    addDutyDates,
    {
      isLoading: isAddDutyDatesLoading,
    },
  ] = useAddDutyDatesMutation();

  const {
    handleSubmit,
    control,
    formState,
  } = useForm<FormInputs>({
    defaultValues: {
      startDate: dayjs().startOf("week"),
      endDate: dayjs().endOf("week"),
      isFullDutyDate: false,
    },
  });

  const handleDateChange = (setValue: (value: Dayjs) => void) => (value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>) => {
    if (value && !context.validationError) {
      setValue(value);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await addDutyDates({
        startDate: data.startDate.add(1, "day").toISOString(),
        endDate: data.endDate.toISOString(),
        isFullDutyDate: data.isFullDutyDate,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box padding={CONFIG.LAYOUT_PADDING}>
      <DatePicker label="Start" value={startDate} onChange={handleDateChange(setStartDate)} />
      <DatePicker label="End" value={endDate} onChange={handleDateChange(setEndDate)} />
      <br />
      <br />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="startDate"
          rules={{
            required: true,
            validate: {
              valid: (value) => value.isValid(),
            },
          }}
          render={({ field }) => <DatePicker label="Start Edit" {...field} />}
        />
        <Controller
          control={control}
          name="endDate"
          rules={{
            required: true,
            validate: {
              afterStartDate: (value, formValues) => value.isAfter(formValues.startDate) || value.isSame(formValues.startDate),
              valid: (value) => value.isValid(),
            },
          }}
          render={({ field }) => <DatePicker label="End Edit" {...field} />}
        />
        <Controller
          control={control}
          name="isFullDutyDate"
          render={({ field }) => <FormControlLabel label="Trực full" control={<Checkbox {...field} />} />}
        />
        <Button type="submit" disabled={!formState.isValid || isAddDutyDatesLoading}>Chia ca</Button>
      </Box>
      {militias && dutyDates && <DutyDateTable militias={militias} dutyDates={dutyDates} sx={{ marginTop: 2 }} />}
    </Box>
  );
}

export default DutyDatesPage;
