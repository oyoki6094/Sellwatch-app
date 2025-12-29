import React, { createContext, useContext, useState, useEffect } from "react";

const defaultPalette = {
  blueSky: { background: "#EAF4FF", text: "#0A1E3F", primary: "#2979FF", card: "#FFFFFF", border: "#ccc", primaryText: "#fff" },
  dark: { background: "#121212", text: "#FFFFFF", primary: "#2979FF", card: "#1E1E1E", border: "#444", primaryText: "#fff" },
  white: { background: "#FFFFFF", text: "#000000", primary: "#2979FF", card: "#F7F7F7", border: "#ccc", primaryText: "#fff" },
  sunset: { background: "#FFF3E0", text: "#4E342E", primary: "#FF7043", card: "#FFE0B2", border: "#D6A77A", primaryText: "#fff" },
};

const defaultCurrency = "XOF";
const defaultTextSize = "16px";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [palette, setPalette] = useState(localStorage.getItem("palette") || "blueSky");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || defaultCurrency);
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || defaultTextSize);

  useEffect(() => {
    localStorage.setItem("palette", palette);
    localStorage.setItem("currency", currency);
    localStorage.setItem("textSize", textSize);
    document.body.style.fontSize = textSize;
  }, [palette, currency, textSize]);

  return (
    <SettingsContext.Provider
      value={{
        theme: defaultPalette[palette],
        currency,
        textSize,
        setPalette,
        setCurrency,
        setTextSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings doit être utilisé dans SettingsProvider");
  return context;
};
