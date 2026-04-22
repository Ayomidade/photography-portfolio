/**
 * ThemeToggle
 *
 * Minimal toggle — sun/moon icon pair.
 * Light theme shows moon (click to go dark).
 * Dark theme shows sun (click to go light).
 */

import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        border: "1px solid var(--border)",
        borderRadius: "50%",
        color: "var(--muted)",
        fontSize: "11px",
        transition: "color var(--transition), border-color var(--transition)",
        flexShrink: 0,
        cursor: "pointer",
        background: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text)";
        e.currentTarget.style.borderColor = "var(--text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--muted)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {theme === "light" ? "◐" : "○"}
    </button>
  );
};

export default ThemeToggle;
