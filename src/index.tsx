import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import AppThemeProvider from "./providers/AppThemeProvider";
import BreakpointsProvider from "./providers/BreakpointsProvider";
import ConfirmationDialogProvider from "./providers/ConfirmationDialogProvider";
import InfoProvider from "./providers/InfoProvider";
import NotificationProvider from "./providers/NotificationProvider";
import PaletteModeProvider from "./providers/PaletteModeProvider";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>{/* redux store */}
      <NotificationProvider>{/* control notification toasts */}
        <ConfirmationDialogProvider>{/* shared confirmation dialog */}
          <InfoProvider>{/* info about style and environment changes */}
            <PaletteModeProvider>{/* dark, light modes */}
              <AppThemeProvider>{/* mui theme */}
                <BreakpointsProvider>{/* breakpoints helper */}
                  <BrowserRouter>{/* react router */}
                    <App />
                  </BrowserRouter>
                </BreakpointsProvider>
              </AppThemeProvider>
            </PaletteModeProvider>
          </InfoProvider>
        </ConfirmationDialogProvider>
      </NotificationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
