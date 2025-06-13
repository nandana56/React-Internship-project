import React from "react";
import LightButton from "../../assets/website/light-mode-button.png";
import DarkButton from "../../assets/website/dark-mode-button.png";
import "./DarkMode.css";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  const element = document.documentElement;

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, element]);

  return (
    <div className="position-relative" style={{ width: "3rem", height: "3rem" }}>
      <img
        src={LightButton}
        alt="Light Mode"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`theme-toggle position-absolute end-0 top-0 shadow-sm ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        src={DarkButton}
        alt="Dark Mode"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`theme-toggle shadow-sm ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default DarkMode;
