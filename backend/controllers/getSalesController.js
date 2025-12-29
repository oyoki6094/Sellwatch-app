const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/sales.json");

// Statistiques simples
exports.getStats = (req, res) => {
  const sales = JSON.parse(fs.readFileSync(filePath));
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

  // Top produit par montant
  const productTotals = {};
  sales.forEach(sale => {
    if (!productTotals[sale.product]) productTotals[sale.product] = 0;
    productTotals[sale.product] += sale.amount;
  });

  const topProducts = Object.entries(productTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  res.json({
    totalSales,
    topProducts,
    totalOrders: sales.length
  });
};
