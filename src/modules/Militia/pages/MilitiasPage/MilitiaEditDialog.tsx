import CONFIG from "@/configs";
import Militia from "@/models/entities/Militia";
import { useUpdateMilitiaMutation } from "@/redux/apis/militiaApi";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField, styled } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  fullName: string;
  phoneNumber: string;
  dutyDateScore: number;
  assignmentScore: number;
}

type MilitiaEditDialogProps = DialogProps & {
  militia: Militia;
  onExit?: () => void;
}

const MilitiaEditDialog = styled(({ militia, onExit = CONFIG.EMPTY_FUNCTION, ...props }: MilitiaEditDialogProps) => {
  const {
    handleSubmit,
    control,
    formState,
  } = useForm<Inputs>({
    defaultValues: {
      name: militia.name,
      fullName: militia.fullName ?? "",
      phoneNumber: militia.phoneNumber ?? "",
      dutyDateScore: militia.dutyDateScore,
      assignmentScore: militia.assignmentScore,
    },
  });

  const [updateMilitia, { isLoading }] = useUpdateMilitiaMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateMilitia({
      ...militia,
      ...data,
    });
    onExit();
  };

  return (
    <Dialog {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Sửa Thông Tin Cơ Động</DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Tên" error={!!formState.errors.name} margin="dense" />}
        />
        <Controller
          control={control}
          name="dutyDateScore"
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Điểm trực" error={!!formState.errors.dutyDateScore} type="number" margin="dense" />}
        />
        <Controller
          control={control}
          name="assignmentScore"
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Điểm coi cổng" error={!!formState.errors.assignmentScore} type="number" margin="dense" />}
        />
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => <TextField {...field} label="Họ Tên" error={!!formState.errors.fullName} margin="dense" />}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => <TextField {...field} label="Sđt" error={!!formState.errors.phoneNumber} margin="dense" />}
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" disabled={isLoading} onClick={onExit}>Hủy</Button>
        <Button type="submit" disabled={isLoading || !formState.isValid}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
})(null);

export default MilitiaEditDialog;
