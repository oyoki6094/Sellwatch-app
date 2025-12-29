import React, { useState, useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

function SettingsPage() {
  const { theme, currency, textSize, setPalette, setCurrency, setTextSize } = useSettings();
  const [localPalette, setLocalPalette] = useState(localStorage.getItem("palette") || "blueSky");
  const [localCurrency, setLocalCurrency] = useState(localStorage.getItem("currency") || currency);
  const [localTextSize, setLocalTextSize] = useState(localStorage.getItem("textSize") || textSize);

  useEffect(() => {
    document.body.style.fontSize = localTextSize;
  }, [localTextSize]);

  const handleSave = () => {
    setPalette(localPalette);
    setCurrency(localCurrency);
    setTextSize(localTextSize);
    alert("Paramètres enregistrés !");
  };

  const formStyle = { display: "flex", flexDirection: "column", gap: 15, maxWidth: 400, width: "100%" };
  const labelStyle = { fontWeight: "bold" };
  const selectStyle = { padding: 8, borderRadius: 4, border: `1px solid ${theme.border}`, width: "100%" };
  const buttonStyle = { padding: "10px 16px", borderRadius: 4, border: "none", background: theme.primary, color: theme.primaryText, cursor: "pointer" };

  return (
    <div style={{ minHeight: "100vh", padding: 20, background: theme.background, color: theme.text, boxSizing: "border-box" }}>
      <h2>Paramètres</h2>
      <div style={formStyle}>
        <div>
          <label style={labelStyle}>Thème :</label>
          <select value={localPalette} onChange={e => setLocalPalette(e.target.value)} style={selectStyle}>
            <option value="blueSky">Blue Sky</option>
            <option value="dark">Dark</option>
            <option value="white">White</option>
            <option value="sunset">Sunset</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Devise :</label>
          <select value={localCurrency} onChange={e => setLocalCurrency(e.target.value)} style={selectStyle}>
            <option value="XOF">XOF</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Taille du texte :</label>
          <select value={localTextSize} onChange={e => setLocalTextSize(e.target.value)} style={selectStyle}>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>

        <button onClick={handleSave} style={buttonStyle}>Enregistrer</button>
      </div>
    </div>
  );
}

export default SettingsPage;
