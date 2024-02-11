import Suspense from "@/components/Suspense";
import { BreakpointsContext } from "@/providers/BreakpointsProvider";
import { Box, Container, Paper, useTheme } from "@mui/material";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header, { withHeaderProvider } from "./Header";
import Sidebar, { SidebarContext, withSidebarProvider } from "./Sidebar";

function MainLayout() {
  const { sidebarState, miniSidebarTransition, permanentSidebarTransition } = useContext(SidebarContext);
  const { smAndDown } = useContext(BreakpointsContext);
  const theme = useTheme();

  return (
    <>
      <Paper square
        sx={{
          boxShadow: "none",
          overflow: "auto",
          backgroundColor: { md: theme.palette.background.default },
          backgroundImage: { md: "none" },
        }}>{/* background for app */}
        <Header />
        <Sidebar />
        <Box component="main"
          sx={{
            marginLeft: "var(--sidebar-current-width)",
            marginTop: "var(--header-client-height)",
            ...(sidebarState === "mini" && {
              transition: miniSidebarTransition("margin"),
            }),
            ...((sidebarState === "permanent" || sidebarState === "miniHovered") && {
              transition: permanentSidebarTransition("margin"),
            }),
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: "calc(100vh - var(--header-client-height))",
          }}>{/* spacing between sidebar & header */}
          <Container disableGutters maxWidth="lg" sx={{
            padding: { md: 4 },
            flexGrow: 1,
            display: { md: "flex" },
          }}>{/* center content & limit content size */}
            <Paper square={smAndDown} sx={{
              boxShadow: "none",
              width: "100%",
            }}>{/* background color for main content */}
              <Suspense>
                <Outlet />
              </Suspense>
            </Paper>
          </Container>
          <Footer />
        </Box>
      </Paper>
      {/* shared components */}
    </>
  );
}

export default withHeaderProvider(withSidebarProvider(MainLayout));
