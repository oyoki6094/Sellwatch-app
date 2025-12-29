import React, { useState, useEffect } from "react";
import { useSettings } from "../context/SettingsContext";

function Stock() {
  const { theme, textSize } = useSettings();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [sold, setSold] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("stock")) || []);
    document.body.style.fontSize = textSize;
  }, [textSize]);

  const saveStock = (data) => { localStorage.setItem("stock", JSON.stringify(data)); setProducts(data); };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) return;
    saveStock([...products, { id: Date.now(), name, quantity: Number(quantity), price: Number(price), sold: Number(sold) || 0 }]);
    setName(""); setQuantity(""); setPrice(""); setSold("");
  };

  const handleEdit = (id) => {
    const p = products.find(x => x.id === id);
    const n = prompt("Modifier nom du produit", p.name);
    const q = prompt("Modifier quantité", p.quantity);
    const pr = prompt("Modifier prix", p.price);
    const s = prompt("Modifier vendu", p.sold);
    if (!n || !q || !pr) return;
    saveStock(products.map(x => x.id === id ? { ...x, name: n, quantity: Number(q), price: Number(pr), sold: Number(s) || 0 } : x));
  };

  const handleDelete = (id) => saveStock(products.filter(x => x.id !== id));

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const getStockStatus = (product) => product.quantity === 0 ? "En attente" : product.quantity <= 5 ? "Faible" : product.quantity >= 50 ? "Excès" : "Normal";
  const isProfitable = (product) => product.sold * product.price > 100;

  return (
    <div style={{ minHeight: "100vh", background: theme.background, color: theme.text, padding: 10, boxSizing: "border-box", fontSize: textSize }}>
      <h2>Gestion du Stock</h2>

      <form onSubmit={handleAdd} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
        {[{value: name,set:setName,placeholder:"Nom du produit"},{value: quantity,set:setQuantity,placeholder:"Quantité"},{value: price,set:setPrice,placeholder:"Prix unitaire"},{value: sold,set:setSold,placeholder:"Vendu"}].map((f,i)=>(
          <input key={i} placeholder={f.placeholder} value={f.value} onChange={e=>f.set(e.target.value)} style={{ padding:8,borderRadius:4,border:`1px solid ${theme.border}`, flex:1,minWidth:120 }}/>
        ))}
        <button type="submit" style={{ padding:"8px 16px", borderRadius:4, border:"none", background:theme.primary, color:theme.card }}>Ajouter</button>
      </form>

      <input placeholder="Rechercher un produit..." value={search} onChange={e=>setSearch(e.target.value)} style={{ padding:8, marginBottom:10, borderRadius:4, border:`1px solid ${theme.border}`, width:"100%", maxWidth:300 }}/>

      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
          <thead>
            <tr style={{ background:theme.primary, color:"#fff" }}>
              {["#", "Nom", "Quantité", "Prix", "Vendu", "Statut", "Rentable"].map((h,i)=><th key={i} style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx)=>(
              <tr key={p.id} style={{ backgroundColor: idx%2===0 ? theme.card : theme.background, cursor:"context-menu" }}
                onContextMenu={e=>{ e.preventDefault(); const action=window.prompt("Tapez 'modifier' ou 'supprimer'"); if(action==="modifier") handleEdit(p.id); else if(action==="supprimer") handleDelete(p.id); }}>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{idx+1}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{p.name}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{p.quantity}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{p.price}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{p.sold}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{getStockStatus(p)}</td>
                <td style={{ padding:8,border:"1px solid #ccc", textAlign:"center" }}>{isProfitable(p) ? "✅" : "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stock;
