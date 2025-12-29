import theme from "../styles/theme";

function StatsCards({ totalVentes, nombreVentes }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >
      <div
        style={{
          background: theme.colors.white,
          padding: "20px",
          borderRadius: theme.radius,
          boxShadow: theme.shadow
        }}
      >
        <h3>Total des ventes</h3>
        <p style={{ fontSize: "24px", color: theme.colors.secondary }}>
          {totalVentes} FCFA
        </p>
      </div>

      <div
        style={{
          background: theme.colors.white,
          padding: "20px",
          borderRadius: theme.radius,
          boxShadow: theme.shadow
        }}
      >
        <h3>Nombre de commandes</h3>
        <p style={{ fontSize: "24px", color: theme.colors.secondary }}>
          {nombreVentes}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
