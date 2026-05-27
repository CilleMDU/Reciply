import { useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";

export default function ThemeProvider({ children }) {
  const [crispyTheme, setCrispyTheme] = useState(() => {
    const savedCrispyTheme = localStorage.getItem("crispyTheme");
    return savedCrispyTheme !== null ? savedCrispyTheme === "true" : false;
  });

  const [buzzyTheme, setBuzzyTheme] = useState(() => {
    const savedBuzzyTheme = localStorage.getItem("buzzyTheme");
    return savedBuzzyTheme !== null ? savedBuzzyTheme === "true" : false;
  });

  const [cherryTheme, setCherryTheme] = useState(() => {
    const savedCherryTheme = localStorage.getItem("cherryTheme");
    return savedCherryTheme !== null ? savedCherryTheme === "true" : false;
  });

  useEffect(() => {
    if (crispyTheme) {
      document.documentElement.classList.add("crispyTheme");
    } else {
      document.documentElement.classList.remove("crispyTheme");
    }
    localStorage.setItem("crispyTheme", (crispyTheme));
  }, [crispyTheme]);

  useEffect(() => {
    if (buzzyTheme) {
      document.documentElement.classList.add("buzzyTheme");
    } else {
      document.documentElement.classList.remove("buzzyTheme");
    }
    localStorage.setItem("buzzyTheme", (buzzyTheme));
  }, [buzzyTheme]);

  useEffect(() => {
    if (cherryTheme) {
      document.documentElement.classList.add("cherryTheme");
    } else {
      document.documentElement.classList.remove("cherryTheme");
    }
    localStorage.setItem("cherryTheme", (cherryTheme));
  }, [cherryTheme]);

  return (
    <ThemeContext.Provider
      value={{
        crispyTheme,
        setCrispyTheme,
        buzzyTheme,
        setBuzzyTheme,
        cherryTheme,
        setCherryTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
