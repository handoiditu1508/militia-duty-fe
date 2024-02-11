import { mdAndDownMediaQuery, mdAndUpMediaQuery, mdMediaQuery, smAndDownMediaQuery, smAndUpMediaQuery, smMediaQuery, xsAndUpMediaQuery, xsMediaQuery } from "@/common/breakpointsHelpers";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { ProviderProps } from "react";

type BreakpointsContextType = {
  xs: boolean;
  xsAndUp: boolean;
  smAndDown: boolean;
  sm: boolean;
  smAndUp: boolean;
  mdAndDown: boolean;
  md: boolean;
  mdAndUp: boolean;
  // lgAndDown: boolean;
  // lg: boolean;
  // lgAndUp: boolean;
  // xl: boolean;
  // xlAndUp: boolean;
}

export const BreakpointsContext = React.createContext<BreakpointsContextType>({} as BreakpointsContextType);

type BreakpointsProviderProps = Omit<ProviderProps<BreakpointsContextType>, "value">;

function BreakpointsProvider(props: BreakpointsProviderProps) {
  const theme = useTheme();

  return <BreakpointsContext.Provider value={{
    xs: useMediaQuery(xsMediaQuery(theme.breakpoints)),
    xsAndUp: useMediaQuery(xsAndUpMediaQuery(theme.breakpoints)),
    smAndDown: useMediaQuery(smAndDownMediaQuery(theme.breakpoints)),
    sm: useMediaQuery(smMediaQuery(theme.breakpoints)),
    smAndUp: useMediaQuery(smAndUpMediaQuery(theme.breakpoints)),
    mdAndDown: useMediaQuery(mdAndDownMediaQuery(theme.breakpoints)),
    md: useMediaQuery(mdMediaQuery(theme.breakpoints)),
    mdAndUp: useMediaQuery(mdAndUpMediaQuery(theme.breakpoints)),
    // lgAndDown: useMediaQuery(lgAndDownMediaQuery(theme.breakpoints)),
    // lg: useMediaQuery(lgMediaQuery(theme.breakpoints)),
    // lgAndUp: useMediaQuery(lgAndUpMediaQuery(theme.breakpoints)),
    // xl: useMediaQuery(xlMediaQuery(theme.breakpoints)),
    // xlAndUp: useMediaQuery(xlAndUpMediaQuery(theme.breakpoints)),
  }} {...props} />;
}

export default BreakpointsProvider;
