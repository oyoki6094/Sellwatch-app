import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#2979FF", "#00E5FF", "#0A1E3F", "#FFAA00", "#FF4081"];

const StatsCharts = ({ topProducts }) => {
  const dataBar = topProducts.map(([product, amount]) => ({ product, amount }));
  const dataPie = topProducts.map(([product, amount]) => ({ name: product, value: amount }));

  return (
    <>
      <div>
        <h3>Top produits (Bar Chart)</h3>
        <BarChart
          width={window.innerWidth < 600 ? window.innerWidth - 40 : 500}
          height={300}
          data={dataBar}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#2979FF" />
        </BarChart>
      </div>

      <div>
        <h3>Top produits (Pie Chart)</h3>
        <PieChart
          width={window.innerWidth < 600 ? window.innerWidth - 40 : 400}
          height={300}
        >
          <Pie
            data={dataPie}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dataPie.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </>
  );
};

export default StatsCharts;
