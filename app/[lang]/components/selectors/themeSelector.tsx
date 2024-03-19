"use client";

import { useContext } from "react";
import ThemeContext from "@/app/[lang]/contexts/themeContext";
import BlueSimpleButton from "@/app/[lang]/components/blueSimpleButton";
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
