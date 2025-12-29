import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function SalesChart({ sales }) {
  const top5 = [...sales].sort((a,b)=>b.amount-a.amount).slice(0,5);
  const barData = top5.map(s => ({ name: s.product, amount: s.amount }));
  const pieData = top5.map(s => ({ name: s.product, value: s.amount }));
  const COLORS = ["#00BFFF", "#00FF7F", "#FF7F7F", "#2979FF", "#7FFF00"];

  return (
    <div style={{ display:"flex", gap:"15px", flexWrap:"wrap" }}>
      <div style={{ width:"100%", maxWidth:"600px", height:250 }}>
        <h3>Top 5 ventes (Barres)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#00BFFF" radius={[5,5,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width:"100%", maxWidth:"300px", height:250 }}>
        <h3>Top 5 ventes (Cercle)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
              {pieData.map((entry,index)=> <Cell key={index} fill={COLORS[index % COLORS.length]} /> )}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
