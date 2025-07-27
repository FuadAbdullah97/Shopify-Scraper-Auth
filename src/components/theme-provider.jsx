import { createContext, useContext, useEffect, useState } from "react";

// In plain JavaScript, we often document types using JSDoc comments,
// though they are not enforced by the language.
/**
 * @typedef {"dark" | "light" | "system"} Theme
 */

/**
 * @typedef {object} ThemeProviderProps
 * @property {React.ReactNode} children
 * @property {Theme} [defaultTheme="system"]
 * @property {string} [storageKey="vite-ui-theme"]
 */

/**
 * @typedef {object} ThemeProviderState
 * @property {Theme} theme
 * @property {(theme: Theme) => void} setTheme
 */

/** @type {ThemeProviderState} */
const initialState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

/**
 * @param {ThemeProviderProps} props
 */
export function ThemeProvider({
                                  children,
                                  defaultTheme = "system",
                                  storageKey = "vite-ui-theme",
                                  ...props
                              }) {
    const [theme, setTheme] = useState(
        () => (localStorage.getItem(storageKey) || defaultTheme)
    );

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme) => { // Removed type annotation for newTheme
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};