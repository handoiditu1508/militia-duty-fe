import CONFIG from "@/configs";
import React, { ProviderProps, useRef, useState } from "react";

export type ConfirmationDialogOptions = {
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  hideCancelButton?: boolean;
  onCancel?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  preventCloseOnConfirm?: boolean;
}

export type CancelReason = "backdropClick" | "escapeKeyDown" | "cancelButton";

type ConfirmationDialogContextType = {
  openDialog: (title: string, options?: ConfirmationDialogOptions) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
  open: boolean;
  loading: boolean;
  title: string;
  description?: string;
  cancelButtonText: string;
  confirmButtonText: string;
  hideCancelButton: boolean;
  onCancel: (reason: CancelReason) => void | Promise<void>;
  onConfirm: () => void | Promise<void>;
  preventCloseOnConfirm: boolean;
}

type ConfirmationDialogProviderProps = Omit<ProviderProps<ConfirmationDialogContextType>, "value">;

export const ConfirmationDialogContext = React.createContext<ConfirmationDialogContextType>({} as ConfirmationDialogContextType);

function ConfirmationDialogProvider(props: ConfirmationDialogProviderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [cancelButtonText, setCancelButtonText] = useState<string>("Cancel");
  const [confirmButtonText, setConfirmButtonText] = useState<string>("Confirm");
  const [hideCancelButton, setHideCancelButton] = useState<boolean>(false);
  const onCancel = useRef<() => void | Promise<void>>(CONFIG.EMPTY_FUNCTION);
  const onConfirm = useRef<() => void | Promise<void>>(CONFIG.EMPTY_FUNCTION);
  const [preventCloseOnConfirm, setPreventCloseOnConfirm] = useState<boolean>(false);

  const openDialog = (title: string, options?: ConfirmationDialogOptions) => {
    setOpen(true);
    setTitle(title);
    if (options) {
      setDescription(options.description);
      setCancelButtonText(options.cancelButtonText || "Cancel");
      setConfirmButtonText(options.confirmButtonText || "Confirm");
      setHideCancelButton(!!options.hideCancelButton);
      onCancel.current = options.onCancel || CONFIG.EMPTY_FUNCTION;
      onConfirm.current = options.onConfirm || CONFIG.EMPTY_FUNCTION;
      setPreventCloseOnConfirm(!!options.preventCloseOnConfirm);
    } else {
      setDescription(undefined);
      setCancelButtonText("Cancel");
      setConfirmButtonText("Confirm");
      setHideCancelButton(false);
      onCancel.current = CONFIG.EMPTY_FUNCTION;
      onConfirm.current = CONFIG.EMPTY_FUNCTION;
      setPreventCloseOnConfirm(false);
    }
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return <ConfirmationDialogContext.Provider value={{
    openDialog,
    closeDialog,
    setLoading,
    open,
    loading,
    title,
    description,
    cancelButtonText,
    confirmButtonText,
    hideCancelButton,
    onCancel: onCancel.current,
    onConfirm: onConfirm.current,
    preventCloseOnConfirm,
  }} {...props} />;
}

export default ConfirmationDialogProvider;
