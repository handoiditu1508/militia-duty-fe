import { BreakpointsContext } from "@/providers/BreakpointsProvider";
import { useTheme } from "@mui/material";
import React, { ProviderProps, useContext, useEffect, useState } from "react";

type HeaderContextType = {
  headerHeight: number;
  headerTopSpacing: number;
  headerClientHeight: number;// headerHeight + headerTopSpacing + other spacings if any
};
export const HeaderContext = React.createContext<HeaderContextType>({} as HeaderContextType);

type HeaderProviderProps = Omit<ProviderProps<HeaderContextType>, "value">;

function HeaderProvider(props: HeaderProviderProps) {
  const theme = useTheme();
  const { xs, mdAndUp } = useContext(BreakpointsContext);
  const [headerHeight, setHeaderHeight] = useState<number>((xs ? theme.constants.xsHeaderHeight : theme.constants.headerHeight) || 0);
  const [headerTopSpacing, setHeaderTopSpacing] = useState<number>(mdAndUp ? theme.constants.scalingFactor * 2 : 0);
  const [headerClientHeight, setHeaderClientHeight] = useState<number>(headerHeight + headerTopSpacing);
  document.body.style.setProperty("--header-top-spacing", `${headerTopSpacing}px`);
  document.body.style.setProperty("--header-height", `${headerHeight}px`);
  document.body.style.setProperty("--header-client-height", `${headerHeight + headerTopSpacing}px`);

  useEffect(() => {
    const height: number = (xs ? theme.constants.xsHeaderHeight : theme.constants.headerHeight) || 0;
    setHeaderHeight(height);
    setHeaderClientHeight(height + headerTopSpacing);
    document.body.style.setProperty("--header-height", `${height}px`);
  }, [xs, headerTopSpacing, theme]);

  useEffect(() => {
    const newValue: number = mdAndUp ? theme.constants.scalingFactor * 2 : 0;
    setHeaderTopSpacing(newValue);
    document.body.style.setProperty("--header-top-spacing", `${newValue}px`);
  }, [mdAndUp, theme]);

  useEffect(() => {
    document.body.style.setProperty("--header-client-height", `${headerHeight + headerTopSpacing}px`);
  }, [headerHeight, headerTopSpacing]);

  return <HeaderContext.Provider value={{ headerHeight, headerTopSpacing, headerClientHeight }} {...props} />;
}

export default HeaderProvider;
