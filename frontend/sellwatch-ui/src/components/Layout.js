import React from "react";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
      {/* Sidebar gauche */}
      <div style={{
        width: 200,
        backgroundColor: "#FFA500",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 20
      }}>
        <h1 style={{ fontSize: "28px", margin: 0, color: "#FFFFFF" }}>Sellwatch</h1>
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1, padding: 20 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
