import { PaletteMode, useMediaQuery } from "@mui/material";
import React, { ProviderProps, useEffect, useState } from "react";

type PaletteModeContextType = {
  currentPaletteMode: PaletteMode;
  paletteMode: PaletteMode | "system";
  setPaletteMode: (mode: PaletteMode | "system") => void;
}

type PaletteModeProviderProps = Omit<ProviderProps<PaletteModeContextType>, "value">;

export const PaletteModeContext = React.createContext<PaletteModeContextType>({} as PaletteModeContextType);

const checkIsSystemPaletteMode = (mode?: string | null) => !mode || (mode !== "light" && mode !== "dark");

function PaletteModeProvider(props: PaletteModeProviderProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState<PaletteMode | "system">(
    checkIsSystemPaletteMode(localStorage.getItem("paletteMode"))
      ? "system"
      : localStorage.getItem("paletteMode") as PaletteMode
  );
  const currentPaletteMode: PaletteMode = paletteMode === "system" ? (prefersDarkMode ? "dark" : "light") : paletteMode;

  useEffect(() => {
    if (currentPaletteMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [currentPaletteMode]);

  // load prefered palette mode from local storage
  useEffect(() => {
    const localPaletteMode = localStorage.getItem("paletteMode");
    if (!checkIsSystemPaletteMode(localPaletteMode)) {
      setPaletteMode(localPaletteMode as PaletteMode);
    } else {
      setPaletteMode(prefersDarkMode ? "dark" : "light");
      localStorage.removeItem("paletteMode");
    }
  }, [prefersDarkMode]);

  const setPaletteModeWrapper = (mode: PaletteMode | "system") => {
    setPaletteMode(mode);
    if (mode !== "system") {
      localStorage.setItem("paletteMode", mode);
    } else {
      localStorage.removeItem("paletteMode");
    }
  };

  return <PaletteModeContext.Provider value={{ currentPaletteMode, paletteMode, setPaletteMode: setPaletteModeWrapper }} {...props} />;
}

export default PaletteModeProvider;
