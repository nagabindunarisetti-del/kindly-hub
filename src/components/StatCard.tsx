import { Card, Typography } from "@mui/material";

export default function StatCard({ title, value, danger = false }: { title: string; value: string | number; danger?: boolean }) {
  return (
    <Card sx={{ p: "14px 16px", transition: "border-color .15s", "&:hover": { borderColor: "var(--primary)" } }}>
      <Typography sx={{ fontSize: ".9rem", color: "var(--ink-2)", fontWeight: 700 }}>{title}</Typography>
      <Typography sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, lineHeight: 1.15, color: danger ? "var(--bad)" : "var(--ink)" }}>{value}</Typography>
    </Card>
  );
}
