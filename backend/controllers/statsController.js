const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/sales.json");

exports.getStats = (req, res) => {
  const sales = JSON.parse(fs.readFileSync(filePath));

  // Total des ventes
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

  // Nombre total de ventes
  const totalOrders = sales.length;

  // Calcul du Top 5 produits par montant
  const productTotals = {};
  sales.forEach(sale => {
    if (!productTotals[sale.product]) productTotals[sale.product] = 0;
    productTotals[sale.product] += sale.amount;
  });

  const topProducts = Object.entries(productTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // garde les 5 premiers produits

  res.json({
    totalSales,
    totalOrders,
    topProducts
  });
};
