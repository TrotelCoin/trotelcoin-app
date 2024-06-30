"use client";

import { useContext } from "react";
import ThemeContext from "@/contexts/theme";
import BlueSimpleButton from "@/app/[lang]/components/buttons/blueSimple";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <BlueSimpleButton onClick={toggleTheme}>
        {theme === "dark" ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </BlueSimpleButton>
    </>
  );
};

export default ThemeSwitcher;
