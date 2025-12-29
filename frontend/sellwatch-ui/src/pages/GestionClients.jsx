import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "../context/SettingsContext";

function GestionClients() {
  const { theme, textSize } = useSettings();
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [enAttente, setEnAttente] = useState(false);
  const [paye, setPaye] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [contextMenu, setContextMenu] = useState(null);

  const tableContainerRef = useRef(null);
  const scrollIndexRef = useRef(0);

  useEffect(() => {
    document.body.style.fontSize = textSize;
    const savedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(savedClients);

    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [textSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = tableContainerRef.current;
      if (!container) return;
      const rows = container.querySelectorAll("tbody tr");
      if (rows.length <= 1) return;

      scrollIndexRef.current = (scrollIndexRef.current + 1) % (rows.length - 1);
      const rowToScroll = rows[scrollIndexRef.current + 1];
      container.scrollTo({
        top: rowToScroll.offsetTop,
        behavior: "smooth"
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [clients, search, sortConfig]);

  const saveClients = (data) => {
    localStorage.setItem("clients", JSON.stringify(data));
    setClients(data);
  };

  const validateEmail = (email) => {
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !num) return alert("Nom et numéro obligatoires !");
    if (!validateEmail(email)) return alert("Email invalide !");
    saveClients([
      ...clients,
      { id: Date.now(), name, num, email, product, enAttente, paye, delivered }
    ]);
    setName(""); setNum(""); setEmail(""); setProduct(""); setEnAttente(false); setPaye(false); setDelivered(false);
  };

  const handleEdit = (id) => {
    const c = clients.find(x => x.id === id);
    const newName = prompt("Modifier nom", c.name ?? "");
    const newNum = prompt("Modifier numéro", c.num ?? "");
    const newEmail = prompt("Modifier email", c.email ?? "");
    const newProduct = prompt("Modifier produit", c.product ?? "");
    const newEnAttente = window.confirm("En attente ? OK = oui, Annuler = non");
    const newPaye = window.confirm("Payé ? OK = oui, Annuler = non");
    const newDelivered = window.confirm("Livré ? OK = oui, Annuler = non");

    if (!newName || !newNum) return alert("Nom et numéro obligatoires !");
    if (!validateEmail(newEmail)) return alert("Email invalide !");

    saveClients(clients.map(x => x.id === id ? {
      ...x,
      name: newName, num: newNum, email: newEmail,
      product: newProduct, enAttente: newEnAttente,
      paye: newPaye, delivered: newDelivered
    } : x));
  };

  const handleDelete = (id) => saveClients(clients.filter(c => c.id !== id));

  const applySort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortedClients = [...clients]
    .filter(c =>
      (c.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.num ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.product ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = (a[sortConfig.key] ?? "").toString().toLowerCase();
      const bValue = (b[sortConfig.key] ?? "").toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const favoriteClient = sortedClients.reduce((prev, curr) => {
    if (!curr.paye) return prev;
    if (!prev) return curr;
    if ((curr.product?.length ?? 0) > (prev.product?.length ?? 0)) return curr;
    return prev;
  }, null);

  const handleContextMenu = (e, client) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, clientId: client.id });
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.background, color: theme.text, padding: 10, boxSizing: "border-box" }}>
      <h2>Gestion des Clients</h2>

      {favoriteClient && (
        <div style={{ marginBottom: 15, padding: 10, border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.card }}>
          <strong>⭐ Client favori :</strong> {favoriteClient.name} | {favoriteClient.num} | {favoriteClient.email || "-"} | {favoriteClient.product}
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleAdd} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        {[name, num, email, product].map((value, idx) => (
          <input
            key={idx}
            placeholder={["Nom", "Numéro", "Email", "Produit commandé"][idx]}
            value={value}
            onChange={e => [setName, setNum, setEmail, setProduct][idx](e.target.value)}
            style={{ flex: 1, minWidth: 150, padding: 8, borderRadius: 4, border: `1px solid ${theme.border}` }}
          />
        ))}
        {[
          { label: "En attente ?", state: enAttente, setter: setEnAttente },
          { label: "Payé ?", state: paye, setter: setPaye },
          { label: "Livré ?", state: delivered, setter: setDelivered }
        ].map((checkbox, idx) => (
          <label key={idx} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {checkbox.label}
            <input type="checkbox" checked={checkbox.state} onChange={e => checkbox.setter(e.target.checked)} />
          </label>
        ))}
        <button type="submit" style={{ padding: "8px 16px", background: theme.primary, color: "#fff", border: "none", borderRadius: 4 }}>Ajouter</button>
      </form>

      <input
        placeholder="Rechercher..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 300, padding: 8, borderRadius: 4, border: `1px solid ${theme.border}`, marginBottom: 15 }}
      />

      <div ref={tableContainerRef} style={{ maxHeight: 400, overflowY: "auto", overflowX: "auto", border: `1px solid ${theme.border}`, borderRadius: 6 }}>
        <table style={{ width: "100%", minWidth: 700, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["#", "Nom", "Numéro", "Email", "Produit", "En attente", "Payé", "Livré"].map((title, idx) => (
                <th key={idx} style={{ border: `1px solid ${theme.border}`, padding: 8, cursor: idx > 0 && idx < 4 ? "pointer" : "default" }} onClick={() => ["name", "num", "email"][idx-1] && applySort(["name","num","email"][idx-1])}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((c, i) => (
              <tr key={c.id} onContextMenu={(e) => handleContextMenu(e, c)} style={{ cursor: "context-menu" }}>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8, textAlign: "center" }}>{i + 1}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{favoriteClient?.id === c.id ? "⭐ " : ""}{c.name ?? "-"}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{c.num ?? "-"}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{c.email ?? "-"}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8 }}>{c.product ?? "-"}</td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8, textAlign: "center"}}><input type="checkbox" checked={c.enAttente} readOnly /></td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8, textAlign: "center"}}><input type="checkbox" checked={c.paye} readOnly /></td>
                <td style={{ border: `1px solid ${theme.border}`, padding: 8, textAlign: "center"}}><input type="checkbox" checked={c.delivered} readOnly /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          <div style={{ cursor: "pointer", padding: "4px 8px" }} onClick={() => { handleEdit(contextMenu.clientId); setContextMenu(null); }}>Modifier</div>
          <div style={{ cursor: "pointer", padding: "4px 8px" }} onClick={() => { handleDelete(contextMenu.clientId); setContextMenu(null); }}>Supprimer</div>
        </div>
      )}
    </div>
  );
}

export default GestionClients;
