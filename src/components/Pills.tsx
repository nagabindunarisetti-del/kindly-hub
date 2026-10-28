import { Box } from "@mui/material";

const avatarColors = ["#e11d48", "#ca8a04", "#2563eb", "#c026d3", "#16a34a", "#ea580c", "#0891b2", "#7c3aed"];
export const initials = (name: string) => name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();

export function UserAvatar({ name, size = 28 }: { name: string; size?: number }) {
  const color = avatarColors[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % avatarColors.length];
  return <Box component="span" sx={{ width: size, height: size, borderRadius: "50%", flex: "none", display: "inline-grid", placeItems: "center", color: "#fff", bgcolor: color, fontSize: size * 0.4, fontWeight: 700 }}>{initials(name)}</Box>;
}

const statusColor: Record<string, string> = { Open: "var(--primary)", "On hold": "var(--warn)", Resolved: "var(--ok)", Closed: "var(--ink-3)" };
export function StatusPill({ status }: { status: string }) {
  return <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: ".78rem", fontWeight: 700, px: 1, py: "2px", borderRadius: 99, bgcolor: "var(--sunk)", color: statusColor[status] ?? "var(--ink-3)", whiteSpace: "nowrap", "&::before": { content: '""', width: 8, height: 8, borderRadius: "50%", bgcolor: "currentColor" } }}>{status}</Box>;
}

const prioColor: Record<string, string> = { Urgent: "var(--p-urgent)", High: "var(--p-high)", Normal: "var(--p-medium)", Medium: "var(--p-medium)", Low: "var(--p-low)" };
export function PriorityMark({ priority }: { priority: string }) {
  const c = prioColor[priority] ?? "var(--ink-3)";
  const text = priority === "Normal" || priority === "Medium" ? "var(--ink-2)" : priority === "Low" ? "var(--ink-3)" : c;
  return <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: ".82rem", fontWeight: 700, color: text, whiteSpace: "nowrap", "&::before": { content: '""', width: 9, height: 9, borderRadius: "2px", bgcolor: c } }}>{priority}</Box>;
}
