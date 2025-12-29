import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ModalRating() {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    // Récupérer le compteur depuis localStorage
    const storedCount = parseInt(localStorage.getItem("usageCount") || "0", 10);
    setUsageCount(storedCount + 1);
    localStorage.setItem("usageCount", storedCount + 1);

    // Afficher le
    modal tous les 15 usages
    if ((storedCount + 1) % 15 === 0) {
      setShow(true);
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    alert(`Merci pour votre note : ${rating} étoiles !`);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
        style={{ background: "#fff", padding: 20, borderRadius: 12, width: 300, textAlign: "center" }}>
        <h3>Voulez-vous noter l'application ?</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: 5, margin: "10px 0" }}>
          {[1,2,3,4,5].map((star) => (
            <motion.span key={star}
              whileHover={{ scale: 1.3 }}
              onClick={() => handleStarClick(star)}
              style={{ fontSize: 30, cursor: "pointer", color: star <= rating ? "#FFD700" : "#CCC" }}
            >★</motion.span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 15 }}>
          <button onClick={handleClose} style={{ flex: 1, marginRight: 5, padding: 8, borderRadius: 6, border: "none", background: "#EF5350", color: "#fff" }}>Fermer</button>
          <button onClick={handleSubmit} style={{ flex: 1, marginLeft: 5, padding: 8, borderRadius: 6, border: "none", background: "#42A5F5", color: "#fff" }}>Envoyer</button>
        </div>
      </motion.div>
    </div>
  );
}
