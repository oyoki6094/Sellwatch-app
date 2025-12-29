const express = require("express");
const router = express.Router();

// Import des contrôleurs
const { addSale } = require("../controllers/salesController");
const { getSales } = require("../controllers/getSalesController");
const { getStats } = require("../controllers/statsController");  // <-- ajouter ceci

// Routes existantes
router.post("/add-sale", addSale);
router.get("/sales", getSales);
router.get("/stats", getStats);  // <-- ajouter cette ligne

module.exports = router;
