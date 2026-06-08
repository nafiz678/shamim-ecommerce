import { useEffect, useState } from "react";
import "./theme-button.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "light",
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="theme-toggle"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
