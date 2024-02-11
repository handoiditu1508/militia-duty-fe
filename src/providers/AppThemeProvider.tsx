import { PaletteModeContext } from "@/providers/PaletteModeProvider";
import { createMainTheme } from "@/themes";
import { PaletteMode, Theme, ThemeProvider } from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { useContext, useMemo } from "react";

type AppThemeProviderProps = {
  createTheme?: (mode: PaletteMode) => Theme;
} & Omit<ThemeProviderProps, "theme">;

function AppThemeProvider({ createTheme = createMainTheme, ...props }: AppThemeProviderProps) {
  const { currentPaletteMode } = useContext(PaletteModeContext);

  const theme = useMemo(() => {
    return createTheme(currentPaletteMode);
  }, [currentPaletteMode, createTheme]);

  return <ThemeProvider theme={theme} {...props} />;
}

export default AppThemeProvider;
