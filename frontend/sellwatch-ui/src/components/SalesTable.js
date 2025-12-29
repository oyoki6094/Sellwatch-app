import React from "react";

const SalesTable = ({ sales }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <h2>Liste des ventes</h2>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}>
        <thead style={{ backgroundColor: "#2979FF", color: "#FFFFFF" }}>
          <tr>
            <th style={{ padding: "8px" }}>Produit</th>
            <th style={{ padding: "8px" }}>Montant</th>
            <th style={{ padding: "8px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, idx) => (
            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f0f8ff" : "#ffffff" }}>
              <td style={{ padding: "8px" }}>{sale.product}</td>
              <td style={{ padding: "8px" }}>{sale.amount}</td>
              <td style={{ padding: "8px" }}>{new Date(sale.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
