import React, { useState } from "react";

function ModalSettings({ show, onClose, darkMode, setDarkMode }) {
  if (!show) return null;

  const [notifications, setNotifications] = useState(true);
  const [themeColor, setThemeColor] = useState("#2979FF");
  const [language, setLanguage] = useState("fr");
  const [fontSize, setFontSize] = useState(16);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const resetApp = () => {
    if (window.confirm("Voulez-vous réinitialiser l'application ?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0, bottom:0,
      backgroundColor:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center",
      justifyContent:"center", zIndex:1000, padding:"10px"
    }}>
      <div style={{
        backgroundColor:"#fff", padding:"20px", borderRadius:"12px",
        textAlign:"left", width:"100%", maxWidth:"400px", maxHeight:"90vh",
        overflowY:"auto"
      }}>
        <h2>Paramètres</h2>
        <label><input type="checkbox" checked={darkMode} onChange={()=>setDarkMode(!darkMode)} /> Mode sombre</label><br/>
        <label><input type="checkbox" checked={notifications} onChange={()=>setNotifications(!notifications)} /> Notifications</label><br/>
        <label>Couleur principale : <input type="color" value={themeColor} onChange={e=>setThemeColor(e.target.value)} /></label><br/>
        <label>Langue : 
          <select value={language} onChange={e=>setLanguage(e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </label><br/>
        <label>Taille du texte : <input type="number" value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} /></label><br/>
        <label><input type="checkbox" checked={animationsEnabled} onChange={()=>setAnimationsEnabled(!animationsEnabled)} /> Activer animations</label><br/>
        <label><input type="checkbox" /> Mode auto-thème selon l'heure</label><br/>
        <label><input type="checkbox" /> Sauvegarde / restauration locale</label><br/>
        <label><input type="checkbox" /> Raccourcis clavier</label><br/>
        <button onClick={resetApp} style={{ backgroundColor:"#FF7F7F", padding:"10px", borderRadius:"8px", border:"none", cursor:"pointer", marginTop:"10px" }}>Réinitialiser l'application</button>
        <button onClick={onClose} style={{ marginTop:"10px", padding:"8px 12px", borderRadius:"6px", border:"none", backgroundColor:"#2979FF", color:"#fff", cursor:"pointer" }}>Fermer</button>
      </div>
    </div>
  );
}

export default ModalSettings;
