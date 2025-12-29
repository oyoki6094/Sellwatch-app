import React, { useEffect, useState } from "react";
import { useSettings } from "../context/SettingsContext";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Stats() {
  const settings = useSettings();
  const theme = settings?.theme || {
    background: "#EAF4FF",
    text: "#0A1E3F",
    primary: "#2979FF",
    card: "#FFFFFF",
    border: "#ccc"
  };
  const currency = settings?.currency || "XOF";
  const textSize = settings?.textSize || "16px";

  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    document.body.style.fontSize = textSize;

    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const savedAnnotations = JSON.parse(localStorage.getItem("annotations")) || [];

    setSales(savedSales);
    setOrders(savedOrders);
    setAnnotations(savedAnnotations);
  }, [textSize]);

  // Combinaison ventes et commandes
  const combinedData = [
    ...sales.map(s => ({ ...s, annule: s.annule || false, supprime: s.supprime || false, date: s.date || "" })),
    ...orders.map(o => ({ ...o, annule: o.annule || false, supprime: o.supprime || false, date: o.date || "" }))
  ];

  // Tri pour top ventes
  const topProducts = combinedData
    .filter(c => !c.annule && !c.supprime)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // Données bar chart
  const barData = {
    labels: topProducts.map(p => p.product),
    datasets: [{
      label: `Montant des ventes (${currency})`,
      data: topProducts.map(p => p.amount),
      backgroundColor: theme.primary
    }]
  };

  // Données pie chart
  const pieData = {
    labels: topProducts.map(p => p.product),
    datasets: [{
      data: topProducts.map(p => p.amount),
      backgroundColor: ["#2979FF", "#00E5FF", "#0A1E3F", "#FF7043", "#FFE0B2"]
    }]
  };

  // Données line chart pour chiffre d’affaires
  const lineCAData = {
    labels: combinedData.map(c => c.date),
    datasets: [
      {
        label: "Chiffre d’affaires",
        data: combinedData.map(c => c.amount),
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        fill: false
      },
      {
        label: "Produits annulés",
        data: combinedData.map(c => c.annule ? c.amount : 0),
        borderColor: "#FF4D4F",
        backgroundColor: "#FF4D4F",
        fill: false
      },
      {
        label: "Produits supprimés",
        data: combinedData.map(c => c.supprime ? c.amount : 0),
        borderColor: "#FFA500",
        backgroundColor: "#FFA500",
        fill: false
      }
    ]
  };

  // Données line chart pour annotations clients
  const annotationLineData = {
    labels: annotations.map(a => a.date),
    datasets: [
      {
        label: "Notes clients",
        data: annotations.map(a => a.note),
        borderColor: "#00E5FF",
        backgroundColor: "#00E5FF",
        fill: false
      }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.background, color: theme.text, padding: 20 }}>
      <h2>Statistiques avancées</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "space-between"
      }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Top ventes (Bar)</h3>
          <div style={{ height: 250 }}>
            <Bar data={barData} options={{
              responsive: true,
              plugins: { legend: { display: false } }
            }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Répartition des ventes (Pie)</h3>
          <div style={{ height: 250 }}>
            <Pie data={pieData} options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Évolution CA & produits annulés/supprimés (Line)</h3>
          <div style={{ height: 250 }}>
            <Line data={lineCAData} options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }} />
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Annotations clients</h3>
          <div style={{ height: 250 }}>
            <Line data={annotationLineData} options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } }
            }} />
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 20,
        maxHeight: 400,
        overflowY: "auto",
        border: `1px solid ${theme.border}`,
        borderRadius: 8,
        background: theme.card
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Produit</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Montant</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Livré</th>
              <th style={thStyle}>En attente</th>
              <th style={thStyle}>Payé</th>
              <th style={thStyle}>Annulé</th>
              <th style={thStyle}>Supprimé</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((c, i) => (
              <tr key={c.id} style={{ backgroundColor: c.annule ? "#ffe6e6" : "transparent" }}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{c.product}</td>
                <td style={tdStyle}>{c.client}</td>
                <td style={tdStyle}>{currency} {c.amount}</td>
                <td style={tdStyle}>{c.date}</td>
                <td style={tdStyle}>{c.delivered ? "✔️" : ""}</td>
                <td style={tdStyle}>{c.enAttente ? "✔️" : ""}</td>
                <td style={tdStyle}>{c.paye ? "✔️" : ""}</td>
                <td style={tdStyle}>{c.annule ? "❌" : ""}</td>
                <td style={tdStyle}>{c.supprime ? "⚠️" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles pour uniformiser tableau
const thStyle = { padding: 8, border: "1px solid #ccc", textAlign: "center" };
const tdStyle = { padding: 8, border: "1px solid #ccc", textAlign: "center" };

export default Stats;
