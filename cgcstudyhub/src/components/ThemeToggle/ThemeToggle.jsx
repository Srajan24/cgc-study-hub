import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return "system";
  });
  
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Update system theme when it changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      
      // Only update the actual theme if we're following system preference
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", newSystemTheme === "dark");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  // Apply the current theme and handle system preference changes
  useEffect(() => {
    if (theme === "system") {
      // Follow system theme
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
      localStorage.setItem("theme", "system");
    } else {
      // Use manual theme (light or dark)
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
    
    // For backward compatibility with any code that might be checking darkMode
    localStorage.setItem("darkMode", theme === "system" 
      ? systemTheme === "dark" 
      : theme === "dark"
    );
  }, [theme, systemTheme]);

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  // Render a placeholder while mounting to avoid hydration mismatch
  if (!mounted) {
    return (
      <button 
        aria-label="Toggle theme"
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 opacity-0 cursor-pointer"
      >
        <Sun size={20} />
      </button>
    );
  }

  // Determine which icon to show based on current theme
  // For system theme, show moon (dark) or sun (light) based on current system theme
  const Icon = (theme === "system" && systemTheme === "dark") || theme === "dark" 
    ? Moon 
    : Sun;
    
  const iconClass = (theme === "system" && systemTheme === "dark") || theme === "dark"
    ? "text-yellow-400" 
    : "text-gray-700";
  
  // Get the current active theme for the title/aria-label
  const currentActiveTheme = theme === "system"
    ? `following system (${systemTheme})` 
    : theme;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all hover:scale-105 cursor-pointer"
      aria-label={`Toggle theme - currently ${currentActiveTheme}`}
      // title={`Current theme: ${currentActiveTheme}. Click to cycle through light/dark/system.`}
    >
      <Icon size={20} className={iconClass} />
    </button>
  );
}
