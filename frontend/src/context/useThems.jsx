import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; // Import required utilities

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "dark", // Default theme
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme); // Add the theme class to root
        localStorage.setItem("vite-ui-theme", theme); // Persist theme to localStorage
        set({ theme });
      },
      initializeTheme: () => {
        if (typeof window !== "undefined") {
          const storedTheme = localStorage.getItem("vite-ui-theme");
          const themeToApply = storedTheme || "light"; // Default to light if no stored theme

          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(themeToApply); // Apply the theme to the root

          set({ theme: themeToApply });
        }
      },
    }),
    {
      name: "theme-store", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
