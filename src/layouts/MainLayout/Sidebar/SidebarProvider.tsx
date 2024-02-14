import { BreakpointsContext } from "@/providers/BreakpointsProvider";
import { InfoContext } from "@/providers/InfoProvider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import RuleIcon from "@mui/icons-material/Rule";
import { SwipeableDrawerProps, useTheme } from "@mui/material";
import React, { ProviderProps, useContext, useEffect, useState } from "react";
import { SidebarTab } from "./SidebarItem";


type SidebarState = "hidden" | "temporary" | "mini" | "permanent" | "miniHovered";
type CustomTransition = (...props: string[]) => React.CSSProperties["transition"];
const sidebarTabs: SidebarTab[][] = [
  [
    {
      title: "Ca trực",
      to: "/duty-dates",
      icon: <CalendarTodayIcon />,
      childs: [
        {
          title: "Coi cổng",
          to: "/duty-dates/shifts",
          icon: <AssignmentIndIcon />,
        },
      ],
    },
    {
      title: "Cơ động",
      to: "/militias",
      icon: <PersonIcon />,
    },
    {
      title: "Điều kiện",
      to: "/rules",
      icon: <RuleIcon />,
    },
    {
      title: "Nhiệm vụ",
      to: "/missions",
      icon: <AssignmentIcon />,
    },
  ],
];

type SidebarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  sidebarCurrentWidth: number;// number of pixels sidebar is using permanently
  sidebarPinned: boolean;
  setSidebarPinned: (sidebarPinned: boolean) => void;
  sidebarState: SidebarState;
  sidebarVariant: SwipeableDrawerProps["variant"];
  miniSidebarTransition: CustomTransition;
  permanentSidebarTransition: CustomTransition;
  sidebarHovered: boolean;
  setSidebarHovered: (sidebarHovered: boolean) => void;
  sidebarTabs: SidebarTab[][];
};
export const SidebarContext = React.createContext<SidebarContextType>({} as SidebarContextType);

type SidebarProviderProps = Omit<ProviderProps<SidebarContextType>, "value">;

function SidebarProvider(props: SidebarProviderProps) {
  const theme = useTheme();
  const [sidebarWidth] = useState<number>(theme.constants.sidebarWidth);
  const { mdAndUp } = useContext(BreakpointsContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [miniSidebarWidth] = useState<number>(theme.constants.miniSidebarWidth);
  const [sidebarVariant, setSidebarVariant] = useState<SwipeableDrawerProps["variant"]>();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const { mobile } = useContext(InfoContext);
  const displayAsDesktop = mdAndUp && !mobile;
  const sidebarState: SidebarState = displayAsDesktop
    ? sidebarPinned
      ? "permanent"
      : sidebarHovered ? "miniHovered" : "mini"
    : sidebarOpen ? "temporary" : "hidden";
  const sidebarCurrentWidth: number = displayAsDesktop
    ? (sidebarPinned ? sidebarWidth : miniSidebarWidth)
    : 0;
  document.body.style.setProperty("--sidebar-current-width", `${sidebarCurrentWidth}px`);

  const setSidebarOpenWrapper = (value: boolean) => {
    // can not close sidebar on mdAndUp breakpoint
    if (!displayAsDesktop) {
      setSidebarOpen(value);
    }
  };

  useEffect(() => {
    // sidebar always show on mdAndUp breakpoint
    setSidebarOpen(displayAsDesktop);

    const variant: SwipeableDrawerProps["variant"] = displayAsDesktop ? "permanent" : "temporary";
    setSidebarVariant(variant);
  }, [displayAsDesktop]);

  const miniSidebarTransition = (...props: string[]) => theme.transitions.create(props, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    delay: theme.transitions.duration.shorter,
  });
  const permanentSidebarTransition = (...props: string[]) => theme.transitions.create(props, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    delay: theme.transitions.duration.shorter,
  });

  return <SidebarContext.Provider value={{
    sidebarOpen,
    setSidebarOpen: setSidebarOpenWrapper,
    sidebarCurrentWidth,
    sidebarPinned,
    setSidebarPinned,
    sidebarState,
    sidebarVariant,
    miniSidebarTransition,
    permanentSidebarTransition,
    sidebarHovered,
    setSidebarHovered,
    sidebarTabs,
  }} {...props} />;
}

export default SidebarProvider;
