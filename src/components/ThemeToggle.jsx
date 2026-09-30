import { useEffect, useState } from "react";

// Light/dark switch. Starts from the visitor's system setting, and remembers
// their choice once they click. index.html applies the saved choice on load.
const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || systemTheme()
  );

  // Follow system changes until the visitor has made their own choice
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setTheme(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = theme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked (private mode etc.): the switch still works for this visit
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      className="theme-switch"
      onClick={toggle}
    >
      <span className="theme-switch-knob" aria-hidden="true" />
    </button>
  );
}