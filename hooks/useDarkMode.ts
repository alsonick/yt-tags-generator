import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [currentTheme, setCurrentTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );

  const theme: "dark" | "light" = currentTheme === "dark" ? "light" : "dark";

  const toggle = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme);
    root.classList.add(currentTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", currentTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  return [currentTheme, toggle];
};
