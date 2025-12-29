import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Pages */
import Sales from "./pages/Sales";
import GestionClients from "./pages/GestionClients";
import Stock from "./pages/Stock";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import SettingsPage from "./pages/SettingsPage";
import About from "./pages/About";

/* Components */
import Sidebar from "./components/Sidebar";

/* Thèmes */
const defaultPalette = {
  blueSky: { background: "#EAF4FF", text: "#0A1E3F", primary: "#2979FF", card: "#FFFFFF", border: "#ccc" },
  dark: { background: "#121212", text: "#FFFFFF", primary: "#2979FF", card: "#1E1E1E", border: "#444" },
  white: { background: "#FFFFFF", text: "#000000", primary: "#2979FF", card: "#F7F7F7", border: "#ccc" },
  sunset: { background: "#FFF3E0", text: "#4E342E", primary: "#FF7043", card: "#FFE0B2", border: "#D6A77A" },
};

const defaultCurrency = "XOF";
const defaultTextSize = "16px";

/* Context */
export const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

function App() {
  const [palette, setPalette] = useState(localStorage.getItem("palette") || "blueSky");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || defaultCurrency);
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || defaultTextSize);

  useEffect(() => {
    localStorage.setItem("palette", palette);
    localStorage.setItem("currency", currency);
    localStorage.setItem("textSize", textSize);
    document.body.style.fontSize = textSize;
  }, [palette, currency, textSize]);

  const settings = {
    theme: defaultPalette[palette],
    currency,
    textSize,
    setPalette,
    setCurrency,
    setTextSize,
  };

  return (
    <SettingsContext.Provider value={settings}>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Contenu principal */}
          <div style={{ flex: 1, padding: 20, background: settings.theme.background }}>
            <Routes>
              <Route path="/" element={<Sales />} />
              <Route path="/clients" element={<GestionClients />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
