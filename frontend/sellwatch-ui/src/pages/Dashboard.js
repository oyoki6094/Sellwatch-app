import React, { useState, useEffect } from "react";
import { useSettings } from "../context/SettingsContext";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
const [sales, setSales] = useState([]);

// eslint-disable-next-line no-unused-vars
const [orders, setOrders] = useState([]);
const { theme, currency, textSize } = useSettings();
  const [topSales, setTopSales] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [missingProducts, setMissingProducts] = useState([]);

  const loadData = () => {
    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(savedSales);

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    const combined = [
      ...savedSales,
      ...savedOrders.map(o => ({
        product: o.product,
        amount: o.total,
        client: o.client,
        date: o.date,
        time: o.time
      }))
    ];

    const sorted = combined.sort((a, b) => b.amount - a.amount).slice(0, 5);
    setTopSales(sorted);

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const missing = allProducts.filter(p => p.stock <= 0);
    const available = allProducts.filter(p => p.stock > 0);

    setStockProducts(available);
    setMissingProducts(missing);
  };

  useEffect(() => {
    document.body.style.fontSize = textSize;
    loadData();

    const handleStorageChange = () => loadData();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [textSize]);

  const barData = {
    labels: topSales.map(s => s.product),
    datasets: [{ label: `Montant des ventes (${currency})`, data: topSales.map(s => s.amount), backgroundColor: theme.primary }]
  };
  const barOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  const pieData = {
    labels: topSales.map(s => s.product),
    datasets: [{ data: topSales.map(s => s.amount), backgroundColor: ["#2979FF", "#00E5FF", "#0A1E3F", "#FF7043", "#FFE0B2"] }]
  };
  const pieOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Top ventes", 10, 10);
    topSales.forEach((s, idx) => {
      doc.text(`${idx + 1}. ${s.product} - ${s.amount} ${currency}`, 10, 20 + idx * 10);
    });
    doc.save("TopVentes.pdf");
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(topSales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "TopVentes");
    XLSX.writeFile(wb, "TopVentes.xlsx");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 10, background: theme.background, minHeight: "100vh", color: theme.text, boxSizing: "border-box" }}>
      {/* Graphiques */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", overflowX: "hidden" }}>
        <div style={{ flex: 1, minWidth: 250, maxHeight: 350 }}>
          <h2>Diagramme des ventes</h2>
          <div style={{ height: 200, width: "100%" }}>
            <Bar data={barData} options={barOptions} />
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={exportPDF} style={{ padding: "8px 16px", cursor: "pointer", flex: 1, minWidth: 100 }}>Exporter PDF</button>
            <button onClick={exportExcel} style={{ padding: "8px 16px", cursor: "pointer", flex: 1, minWidth: 100 }}>Exporter Excel</button>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 250, maxHeight: 350 }}>
          <h2>Répartition des ventes (cercle)</h2>
          <div style={{ height: 250, width: "100%", maxWidth: 300, margin: "0 auto" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Liste produits */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
        <div style={{ flex: 1, maxHeight: 250, overflowY: "auto", background: theme.card, padding: 10, borderRadius: 8, minWidth: 250 }}>
          <h3>Produits en stock</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: `1px solid ${theme.border}`, padding: 6 }}>Produit</th>
                  <th style={{ border: `1px solid ${theme.border}`, padding: 6 }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ border: `1px solid ${theme.border}`, padding: 6 }}>{p.name}</td>
                    <td style={{ border: `1px solid ${theme.border}`, padding: 6 }}>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ flex: 1, maxHeight: 250, overflowY: "auto", background: theme.card, padding: 10, borderRadius: 8, minWidth: 250 }}>
          <h3>Produits manquants</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: `1px solid ${theme.border}`, padding: 6 }}>Produit</th>
                  <th style={{ border: `1px solid ${theme.border}`, padding: 6 }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {missingProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ border: `1px solid ${theme.border}`, padding: 6 }}>{p.name}</td>
                    <td style={{ border: `1px solid ${theme.border}`, padding: 6 }}>{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
