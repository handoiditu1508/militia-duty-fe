import { useEffect } from "react";
import "./App.scss";
import { useAppDispatch } from "./hooks";
import { ConfirmationDialog } from "./providers/ConfirmationDialogProvider";
import { NotificationSnackbar } from "./providers/NotificationProvider";
import { loadAuthStateFromLocalAsync } from "./redux/slices/authSlice";
import AppRoutes from "./routes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // load authentication state from local storage when start app
    dispatch(loadAuthStateFromLocalAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppRoutes />
      <NotificationSnackbar />
      <ConfirmationDialog />
    </>
  );
}

export default App;
