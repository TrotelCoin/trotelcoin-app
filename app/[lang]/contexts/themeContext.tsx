import React from "react";

const ThemeContext = React.createContext({
  theme: "system" as string,
  toggleTheme: {} as () => void,
});

export default ThemeContext;
