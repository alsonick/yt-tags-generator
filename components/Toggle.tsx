import { useDarkMode } from "../hooks/useDarkMode";
import { FiSun, FiMoon } from "react-icons/fi";

export const Toggle = () => {
  const [theme, setTheme] = useDarkMode();

  return (
    <button
      className="text-3xl text-black dark:text-white"
      onClick={() => setTheme()}
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
};
