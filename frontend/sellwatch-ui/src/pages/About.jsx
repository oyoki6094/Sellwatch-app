// frontend/sellwatch-ui/src/pages/About.jsx
import React from "react";
import { useSettings } from "../context/SettingsContext";

function About() {
  const { theme, textSize } = useSettings();
  const developerName = "GL Group";

  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/GLGroup",
      color: "#1877F2",
      svg: (
        <svg height="24" width="24" viewBox="0 0 24 24" fill="white">
          <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.325 24H12V14.706h-3.077V11h3.077V8.414c0-3.066 1.874-4.737 4.606-4.737 1.312 0 2.438.097 2.767.141v3.21h-1.901c-1.492 0-1.779.708-1.779 1.746V11h3.555l-.464 3.706h-3.091V24h6.065C23.4 24 24 23.4 24 22.663V1.337C24 .6 23.4 0 22.675 0z"/>
        </svg>
      )
    },
    // ... les autres réseaux sociaux comme Instagram, LinkedIn, Twitter, Snapchat, Email
  ];

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: theme.background,
        color: theme.text,
        fontSize: textSize,
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ fontSize: "2em", marginBottom: 20 }}>À propos</h2>

      <section style={{ marginBottom: 30 }}>
        <p>
          <strong>Sellwatch</strong> est une application de gestion complète des ventes et clients,
          incluant statistiques détaillées, gestion des commandes et export de données.
        </p>
        <p>Version : 1.0.0</p>
        <p>Développée par <strong>{developerName}</strong></p>
        <p>Mission : Simplifier la gestion commerciale et améliorer le suivi client.</p>
        <p>Vision : Fournir des solutions digitales fiables et esthétiques pour professionnels.</p>
      </section>

      <h3 style={{ fontSize: "1.5em", marginBottom: 15 }}>Contacts et réseaux sociaux :</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 10
        }}
      >
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 15px",
              borderRadius: 8,
              background: social.color,
              color: social.name === "Snapchat" ? "#000" : "#fff",
              textDecoration: "none",
              fontWeight: 600,
              minWidth: 180,
              flexShrink: 0,
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            {social.svg}
            <span>{developerName} sur {social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default About;
