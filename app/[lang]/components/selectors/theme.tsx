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
          <MoonIcon className="w-5 h-5" />
        ) : (
          <SunIcon className="w-5 h-5" />
        )}
      </BlueSimpleButton>
    </>
  );
};

export default ThemeSwitcher;
