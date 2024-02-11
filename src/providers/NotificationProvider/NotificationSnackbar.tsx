import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext, notificationMessageTimeout } from "./NotificationProvider";

function NotificationSnackbar() {
  const { currentNotification, nextNotification } = useContext(NotificationContext);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentNotification) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [currentNotification]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (reason === "closebutton") {
      nextNotification();
    }
    setOpen(false);
  };

  const handleClickCloseButton = (event: React.SyntheticEvent | Event) => handleClose(event, "closebutton");

  const action = (<>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClickCloseButton}>
      <CloseIcon fontSize="small" />
    </IconButton>
  </>);

  return (currentNotification ? <Snackbar
    key={currentNotification.id}
    open={open}
    autoHideDuration={notificationMessageTimeout}
    onClose={handleClose}
    message={!currentNotification.severity && currentNotification.text}
    action={!currentNotification.severity && action}>
    {currentNotification.severity && <Alert
      severity={currentNotification.severity}
      elevation={6}
      variant="filled"
      onClose={handleClickCloseButton}
      sx={{ width: "100%" }}>
      {currentNotification.text}
    </Alert>}
  </Snackbar> : null);
}

export default NotificationSnackbar;
