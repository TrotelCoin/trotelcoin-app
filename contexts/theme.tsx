import React from "react";
import { Theme } from "@/types/theme/theme";

const ThemeContext = React.createContext({
  theme: "light" as Theme,
  toggleTheme: {} as () => void,
});

export default ThemeContext;
