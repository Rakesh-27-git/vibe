import { useTheme } from "next-themes";

const UseCurrentTheme = () => {
  const { theme, systemTheme } = useTheme();
  if (theme === "dark" || theme === "light") {
    return theme;
  }
  return systemTheme;
};

export default UseCurrentTheme;
