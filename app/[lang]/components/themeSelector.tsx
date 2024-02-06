"use client";

import { useEffect, useState, createContext, useContext } from "react";

export const ThemeContext = createContext(true);

export function useTheme() {
  return useContext(ThemeContext);
}

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      <ThemeContext.Provider value={theme === "light"}>
        {theme === "dark" && (
          <button
            className="p-2 rounded-full bg-white dark:bg-black focus:bg-white dark:focus:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100"
            onClick={toggleTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </button>
        )}
        {theme === "light" && (
          <button
            className="p-2 rounded-full bg-white dark:bg-black focus:bg-white dark:focus:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-100"
            onClick={toggleTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>
        )}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeSwitcher;
