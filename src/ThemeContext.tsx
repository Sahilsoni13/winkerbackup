// import React, {
//     createContext,
//     useContext,
//     useState,
//     useEffect,
//     ReactNode,
// } from "react";
// import { useColorScheme } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type ThemeContextType = {
//     isDarkMode: boolean;
//     toggleTheme: (mode?: "light" | "dark") => void;
//     bottom: boolean;
//     handlebttom: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     const systemColorScheme = useColorScheme(); // "light" | "dark"
//     const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);
//     const [userPreference, setUserPreference] = useState<boolean | null>(null);
//     const [loaded, setLoaded] = useState(false);
//     const [bottom, setBottom] = useState(false);

//     useEffect(() => {
//         const loadPreference = async () => {
//             try {
//                 const stored = await AsyncStorage.getItem("theme");
//                 if (stored !== null) {
//                     setUserPreference(stored === "dark");
//                 }
//             } catch (error) {
//                 console.error("Failed to load theme preference:", error);
//             } finally {
//                 setLoaded(true);
//             }
//         };
//         loadPreference();
//     }, []);

//     useEffect(() => {
//         if (loaded) {
//             const effectiveDarkMode =
//                 userPreference !== null ? userPreference : systemColorScheme === "dark";
//             setIsDarkMode(effectiveDarkMode);
//         }
//     }, [userPreference, systemColorScheme, loaded]);

//     const toggleTheme = async (mode?: "light" | "dark") => {
//         let newPref: boolean;

//         if (mode === "light") newPref = false;
//         else if (mode === "dark") newPref = true;
//         else newPref = !(userPreference ?? (systemColorScheme === "dark"));

//         setUserPreference(newPref);
//         await AsyncStorage.setItem("theme", newPref ? "dark" : "light");
//     };

//     const handlebttom = () => setBottom((prev) => !prev);

//     if (!loaded || isDarkMode === undefined) return null;

//     return (
//         <ThemeContext.Provider
//             value={{
//                 isDarkMode,
//                 toggleTheme,
//                 bottom,
//                 handlebttom,
//             }}
//         >
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };



// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { useColorScheme } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type ThemeContextType = {
//     isDarkMode: boolean;
//     toggleTheme: (mode?: "light" | "dark") => void;
//     bottom: boolean;
//     handlebttom: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     const systemColorScheme = useColorScheme(); // "light" | "dark"
//     const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(false);
//     const [userPreference, setUserPreference] = useState<boolean | null>(null);
//     const [loaded, setLoaded] = useState(false);
//     const [bottom, setBottom] = useState(false);

//     useEffect(() => {
//         const loadPreference = async () => {
//             try {
//                 const stored = await AsyncStorage.getItem("theme");
//                 if (stored !== null) {
//                     setUserPreference(stored === "dark");
//                 }
//             } catch (error) {
//                 console.error("Failed to load theme preference:", error);
//             } finally {
//                 setLoaded(true);
//             }
//         };
//         loadPreference();
//     }, []);

//     useEffect(() => {
//         if (loaded) {
//             // Apply system color scheme if no user preference is set
//             const effectiveDarkMode =
//                 userPreference !== null ? userPreference : systemColorScheme === "dark";
//             setIsDarkMode(effectiveDarkMode);
//         }
//     }, [userPreference, systemColorScheme, loaded]);

//     const toggleTheme = async (mode?: "light" | "dark") => {
//         let newPref: boolean;

//         if (mode === "light") newPref = false;
//         else if (mode === "dark") newPref = true;
//         else newPref = !(userPreference ?? (systemColorScheme === "dark"));

//         setUserPreference(newPref);
//         await AsyncStorage.setItem("theme", newPref ? "dark" : "light");
//     };

//     const handlebttom = () => setBottom((prev) => !prev);

//     if (!loaded || isDarkMode === undefined) return null;

//     return (
//         <ThemeContext.Provider
//             value={{
//                 isDarkMode,
//                 toggleTheme,
//                 bottom,
//                 handlebttom,
//             }}
//         >
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };


import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: (mode?: "light" | "dark") => void;
    bottom: boolean;
    handlebttom: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme(); // "light" | "dark"
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to light mode
    const [userPreference, setUserPreference] = useState<boolean | null>(null); // User preference in AsyncStorage
    const [loaded, setLoaded] = useState(false); // To track if the preference is loaded
    const [bottom, setBottom] = useState(false);

    useEffect(() => {
        const loadPreference = async () => {
            try {
                const stored = await AsyncStorage.getItem("theme");
                if (stored !== null) {
                    setUserPreference(stored === "dark");
                } else {
                    setUserPreference(false); // Default to light mode if no saved preference
                }
            } catch (error) {
                console.error("Failed to load theme preference:", error);
            } finally {
                setLoaded(true); // Mark as loaded
            }
        };
        loadPreference();
    }, []);

    useEffect(() => {
        if (loaded) {
            // If user preference exists, use that. Otherwise, use system theme.
            const effectiveDarkMode =
                userPreference !== null ? userPreference : systemColorScheme === "dark";
            setIsDarkMode(effectiveDarkMode); // Apply theme (light/dark)
        }
    }, [userPreference, systemColorScheme, loaded]);

    const toggleTheme = async (mode?: "light" | "dark") => {
        let newPref: boolean;

        if (mode === "light") {
            newPref = false;
        } else if (mode === "dark") {
            newPref = true;
        } else {
            // Toggle theme (light <-> dark)
            newPref = !isDarkMode;
        }

        setUserPreference(newPref); // Update local state
        await AsyncStorage.setItem("theme", newPref ? "dark" : "light"); // Save preference to AsyncStorage
    };

    const handlebttom = () => setBottom((prev) => !prev);

    if (!loaded) return null; // Wait until theme preference is loaded

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, bottom, handlebttom }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
