import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "../context/SettingsContext";

function Sales() {
  const { theme, textSize } = useSettings();

  const [sales, setSales] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [contextMenu, setContextMenu] = useState(null);

  const tableContainerRef = useRef(null);

  // Charger les ventes
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(savedSales);
    document.body.style.fontSize = textSize;

    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [textSize]);

  const saveSales = (data) => {
    localStorage.setItem("sales", JSON.stringify(data));
    setSales(data);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!customer || !product || !amount) return alert("Tous les champs sont obligatoires !");
    saveSales([...sales, { id: Date.now(), customer, product, amount: Number(amount) }]);
    setCustomer(""); setProduct(""); setAmount("");
  };

  const handleEdit = (id) => {
    const s = sales.find(x => x.id === id);
    const newCustomer = prompt("Modifier client", s.customer) || s.customer;
    const newProduct = prompt("Modifier produit", s.product) || s.product;
    const newAmount = prompt("Modifier montant", s.amount) || s.amount;
    saveSales(sales.map(x => x.id === id ? { ...x, customer: newCustomer, product: newProduct, amount: Number(newAmount) } : x));
  };

  const handleDelete = (id) => saveSales(sales.filter(s => s.id !== id));

  const bestSale = sales.reduce((prev, curr) => (!prev || curr.amount > prev.amount ? curr : prev), null);

  const filteredSales = sales.filter(s =>
    (s.customer?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (s.product?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (s.amount?.toString() || "").includes(search)
  );

  const handleContextMenu = (e, sale) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, saleId: sale.id });
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.background, color: theme.text, padding: 10, boxSizing: "border-box" }}>
      <h2>Ventes</h2>

      {bestSale && (
        <div style={{ marginBottom: 15, padding: 10, border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.card }}>
          <strong>⭐ Meilleur client :</strong> {bestSale.customer} | Produit : {bestSale.product} | Montant : {bestSale.amount}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleAdd} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {[customer, product, amount].map((value, idx) => (
          <input
            key={idx}
            placeholder={["Nom du client", "Produit", "Montant"][idx]}
            value={value}
            onChange={e => [setCustomer, setProduct, setAmount][idx](e.target.value)}
            style={{ flex: 1, minWidth: 150, padding: 8, borderRadius: 4, border: `1px solid ${theme.border}` }}
          />
        ))}
        <button type="submit" style={{ padding: "8px 16px", background: theme.primary, color: "#fff", border: "none", borderRadius: 4 }}>Ajouter</button>
      </form>

      {/* Recherche */}
      <input
        placeholder="Rechercher..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 300, padding: 8, borderRadius: 4, border: `1px solid ${theme.border}`, marginBottom: 15 }}
      />

      {/* Tableau scrollable */}
      <div ref={tableContainerRef} style={{ maxHeight: 400, overflowY: "auto", overflowX: "auto", border: `1px solid ${theme.border}`, borderRadius: 6 }}>
        <table style={{ width: "100%", minWidth: 500, borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr>
              {["#", "Client", "Produit", "Montant"].map((title, idx) => (
                <th key={idx} style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((s, i) => (
              <tr key={s.id} onContextMenu={(e) => handleContextMenu(e, s)} style={{ cursor: "context-menu", textAlign: "center" }}>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{i + 1}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{s.customer}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{s.product}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{s.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menu contextuel */}
      {contextMenu && (
        <div style={{
          position: "absolute",
          top: contextMenu.y,
          left: contextMenu.x,
          background: theme.card,
          border: `1px solid ${theme.border}`,
          padding: 10,
          borderRadius: 6,
          zIndex: 1000
        }}>
          <div style={{ cursor: "pointer", padding: "4px 8px" }} onClick={() => { handleEdit(contextMenu.saleId); setContextMenu(null); }}>Modifier</div>
          <div style={{ cursor: "pointer", padding: "4px 8px" }} onClick={() => { handleDelete(contextMenu.saleId); setContextMenu(null); }}>Supprimer</div>
        </div>
      )}
    </div>
  );
}

export default Sales;
