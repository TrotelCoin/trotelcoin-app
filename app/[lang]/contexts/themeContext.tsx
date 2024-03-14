import React from "react";
import { Theme } from "@/types/types";

const ThemeContext = React.createContext({
  theme: "light" as Theme,
  toggleTheme: {} as () => void,
});

export default ThemeContext;
