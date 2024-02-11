import logo from "@/assets/logo.svg";
import CustomLink from "@/components/CustomLink";
import CONFIG from "@/configs";
import { BreakpointsContext } from "@/providers/BreakpointsProvider";
import { InfoContext } from "@/providers/InfoProvider";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, Container, IconButton, Slide, Toolbar, Typography, useScrollTrigger, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { SidebarContext } from "../Sidebar";

const Header = React.forwardRef<HTMLDivElement>((_, ref) => {
  const theme = useTheme();
  const { sidebarOpen, setSidebarOpen, sidebarState, miniSidebarTransition, permanentSidebarTransition } = useContext(SidebarContext);
  const { smAndDown } = useContext(BreakpointsContext);
  const { mobile } = useContext(InfoContext);
  const hideHeaderTrigger = useScrollTrigger({ threshold: 250 });
  const shadowHeaderTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState<boolean>(false);

  // add transition manually because of <Slide>'s transition conflict
  const slideTransition = hideHeaderTrigger
    ? theme.transitions.create("transform", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    })
    : theme.transitions.create("transform", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    });

  return (
    <Slide appear={false} direction="down" in={!hideHeaderTrigger}>
      <Box component="main"
        className="mui-fixed"
        sx={{
          marginLeft: "var(--sidebar-current-width)",
          width: "calc(100% - var(--sidebar-current-width))",
          position: "fixed",
          boxSizing: "border-box",
          ...(sidebarState === "mini" && {
            transition: `${miniSidebarTransition("margin", "width")}, ${slideTransition} !important`,
          }),
          ...((sidebarState === "permanent" || sidebarState === "miniHovered") && {
            transition: `${permanentSidebarTransition("margin", "width")}, ${slideTransition} !important`,
          }),
          zIndex: theme.zIndex.appBar,
        }}>
        <Container disableGutters maxWidth="lg" sx={{
          paddingTop: "var(--header-top-spacing)",
          paddingX: { md: 4 },
        }}>
          <AppBar position="relative" ref={ref} elevation={4} color="inherit" sx={{
            borderRadius: { md: 2 },
            boxShadow: shadowHeaderTrigger ? undefined : "none",
          }}>
            <Toolbar>
              {(smAndDown || mobile) && <Box flexGrow={1}>
                <IconButton edge="start" sx={{ marginRight: 1 }} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuIcon /></IconButton>
              </Box>}
              <img src={logo} alt="logo" width={30} height={30} style={{ marginRight: theme.spacing(1) }} />
              <Typography variant="h6">{CONFIG.APP_NAME}</Typography>
              {!(smAndDown || mobile) && <Box sx={{
                marginLeft: 3,
                ">.MuiLink-root": {
                  ...theme.typography.button,
                  ":not(:first-of-type)": {
                    marginLeft: 1,
                  },
                  ":not(:last-of-type)": {
                    marginRight: 1,
                  },
                },
              }}>
                <CustomLink to="/privacy-policy">Privacy Policy</CustomLink>
              </Box>}
              <Box display="flex" justifyContent="flex-end" flexGrow={1}>
                <IconButton color="primary" edge="end" aria-label="settings" onClick={() => setSettingsDrawerOpen(!settingsDrawerOpen)}><SettingsIcon /></IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
    </Slide>
  );
});

export default Header;
