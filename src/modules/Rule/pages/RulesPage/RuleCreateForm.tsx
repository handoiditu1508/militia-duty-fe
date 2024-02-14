import { minutesToHourString } from "@/common/formats";
import DayOfWeek from "@/models/DayOfWeek";
import { RuleType, ruleTypeNameMap } from "@/models/entities/Rule";
import { useGetMilitiasQuery } from "@/redux/apis/militiaApi";
import { useGetMissionsQuery } from "@/redux/apis/missionApi";
import { useAddRuleMutation } from "@/redux/apis/ruleApi";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, BoxProps, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ruleMetaDatas from "./ruleMetaDatas";

type FormInputs = {
  type: RuleType;
  startDate: Dayjs;
  endDate: Dayjs | null;
  description: string;
  militias: number[];
  tasks: number[];
  weeksdays: DayOfWeek[];
  numberValue: number;
}

function RuleCreateForm(props: BoxProps<"form">) {
  const [
    addRule,
    { isLoading },
  ] = useAddRuleMutation();

  const {
    control,
    formState,
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      type: RuleType.DateOff,
      startDate: dayjs(),
      endDate: null,
      description: "",
      weeksdays: [],
      militias: [],
      tasks: [],
      numberValue: 0,
    },
  });
  const ruleType = watch("type");
  const ruleMetaData = ruleMetaDatas[ruleType];

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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await addRule({
        startDate: data.startDate.utc(true).toISOString(),
        endDate: data.endDate ? data.endDate.utc(true).toISOString() : undefined,
        description: data.description.trim() ? data.description : undefined,
        type: data.type,
        militias: militias ? militias.filter(m => data.militias.includes(m.id)) : undefined,
        tasks: ruleMetaData.isShowTasks && missions ? missions.map(m => m.tasks).flat().filter(t => data.tasks.includes(t.id)) : undefined,
        weeksdays: ruleMetaData.isShowWeeksdays ? data.weeksdays : undefined,
        numberValue: ruleMetaData.isShowNumberValue ? data.numberValue : undefined,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="startDate"
        rules={{
          required: true,
          validate: {
            valid: (value) => value.isValid(),
          },
        }}
        render={({ field }) => <DatePicker label="Ngày bắt đầu" {...field} />}
      />
      <Controller
        control={control}
        name="endDate"
        rules={{
          validate: {
            afterStartDate: (value, formValues) => !value || value.isAfter(formValues.startDate) || value.format("yyyyMMdd") === formValues.startDate.format("yyyyMMdd"),
            valid: (value) => !value || value.isValid(),
          },
        }}
        render={({ field }) => <DatePicker label="Ngày kết thúc" {...field} />}
      />
      <IconButton size="small" color="error" onClick={() => setValue("endDate", null)}><ClearIcon fontSize="inherit" /></IconButton>
      <Controller
        control={control}
        name="type"
        rules={{
          required: true,
        }}
        render={({ field }) => <FormControl fullWidth margin="dense">
          <InputLabel>Loại điều kiện</InputLabel>
          <Select label="Loại điều kiện" {...field}>
            {Object.keys(ruleTypeNameMap).map((stringType) => <MenuItem key={stringType} value={Number(stringType)}>
              {ruleTypeNameMap[Number(stringType) as RuleType]}
            </MenuItem>)}
          </Select>
        </FormControl>}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => <TextField
          label="Ghi chú"
          multiline
          minRows={3}
          maxRows={5}
          fullWidth
          margin="dense"
          error={!!formState.errors.description}
          {...field}
        />}
      />
      <Controller
        control={control}
        name="militias"
        rules={{
          required: true,
          validate: {
            minSelected: (value) => value.length >= ruleMetaData.minimumMilitias,
          },
        }}
        render={({ field }) => <FormControl fullWidth margin="dense">
          <InputLabel>Cơ động</InputLabel>
          <Select label="Cơ động" multiple error={!!formState.errors.militias} {...field}>
            {militias && militias.map((militia) => <MenuItem key={militia.id} value={militia.id}>{militia.name}</MenuItem>)}
          </Select>
        </FormControl>}
      />
      {ruleMetaData.isShowTasks && <Controller
        control={control}
        name="tasks"
        rules={{
          required: true,
          validate: {
            minSelected: (value) => value.length > 0,
          },
        }}
        render={({ field }) => <FormControl fullWidth margin="dense">
          <InputLabel>Ca coi cổng</InputLabel>
          <Select label="Ca coi cổng" multiple error={!!formState.errors.tasks} {...field}>
            {missions && missions.map((mission) => mission.tasks.map((task) => (
              <MenuItem key={task.id} value={task.id}>{mission.name} {minutesToHourString(task.startMinute)} - {minutesToHourString(task.endMinute)}</MenuItem>
            )))}
          </Select>
        </FormControl>}
      />}
      {ruleMetaData.isShowWeeksdays && <Controller
        control={control}
        name="weeksdays"
        rules={{
          required: true,
        }}
        render={({ field }) => <FormControl fullWidth margin="dense">
          <InputLabel>Ngày trong tuần</InputLabel>
          <Select label="Ngày trong tuần" multiple {...field}>
            <MenuItem value={DayOfWeek.Sunday}>Chủ Nhật</MenuItem>
            <MenuItem value={DayOfWeek.Monday}>Thứ Hai</MenuItem>
            <MenuItem value={DayOfWeek.Tuesday}>Thứ Ba</MenuItem>
            <MenuItem value={DayOfWeek.Wednesday}>Thứ Tư</MenuItem>
            <MenuItem value={DayOfWeek.Thursday}>Thứ Năm</MenuItem>
            <MenuItem value={DayOfWeek.Friday}>Thứ Sáu</MenuItem>
            <MenuItem value={DayOfWeek.Saturday}>Thứ Bảy</MenuItem>
          </Select>
        </FormControl>}
      />}
      {ruleMetaData.isShowNumberValue && <Controller
        control={control}
        name="numberValue"
        rules={{
          required: true,
        }}
        render={({ field }) => <TextField
          label="Giá trị số"
          error={!!formState.errors.numberValue}
          type="number"
          fullWidth
          margin="dense"
          {...field} />}
      />}
      <Button type="submit" disabled={!formState.isValid || isLoading}>Tạo</Button>
    </Box>
  );
}

export default RuleCreateForm;
