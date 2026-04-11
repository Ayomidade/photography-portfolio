import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        width: "36px",
        height: "20px",
        background: theme === "dark" ? "var(--surface)" : "var(--accent-dim)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        position: "relative",
        cursor: "pointer",
        transition: "background var(--transition)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          left: theme === "dark" ? "3px" : "19px",
          top: "3px",
          width: "12px",
          height: "12px",
          background: "var(--accent)",
          borderRadius: "50%",
          transition: "left var(--transition)",
          display: "block",
        }}
      />
    </button>
  );
};

export default ThemeToggle;
