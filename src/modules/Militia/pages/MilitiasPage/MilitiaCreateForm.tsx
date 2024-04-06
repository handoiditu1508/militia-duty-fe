import { useAddMilitiaMutation } from "@/redux/apis/militiaApi";
import { Box, BoxProps, Button, TextField, styled } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  fullName: string;
  phoneNumber: string;
}

const MilitiaCreateForm = styled((props: BoxProps<"form">) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
  });
  const [addMilitia, { isLoading }] = useAddMilitiaMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addMilitia(data).unwrap();
  };

  return (
    <Box {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} label="Name" error={!!errors.name} />}
      />
      <Controller
        control={control}
        name="fullName"
        render={({ field }) => <TextField {...field} label="Full Name" error={!!errors.fullName} />}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => <TextField {...field} label="Phone Number" error={!!errors.phoneNumber} />}
      />
      <Button type="submit" disabled={isLoading || !isValid}>Create</Button>
    </Box>
  );
})(null);

export default MilitiaCreateForm;
