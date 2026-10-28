import { useMemo, useState } from "react";
import { Box, Button, Card, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, InputBase } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { UserAvatar, StatusPill, PriorityMark } from "../components/Pills";

type Ticket = { id: string; title: string; requester: string; status: string; priority: string; assignee: string; group: string; created: string };
const seed: Ticket[] = [
  { id: "INC0010003", title: "VPN drops every 30 minutes", requester: "Emily Garcia", status: "Open", priority: "High", assignee: "Unassigned", group: "Technical support", created: "49 minutes ago" },
  { id: "SD-174", title: "Wrong currency on invoice", requester: "Arjun Patel", status: "On hold", priority: "Normal", assignee: "Ravi Menon", group: "Billing", created: "3 hours ago" },
  { id: "INC0010048", title: "Access to Process Mining Workspace", requester: "Priya Sharma", status: "Open", priority: "Urgent", assignee: "Unassigned", group: "Access & accounts", created: "9 hours ago" }
];
const views = ["All tickets", "Open", "On hold", "Resolved"];

export default function Tickets() {
  const [params] = useSearchParams();
  const [tickets, setTickets] = useState(seed);
  const [search, setSearch] = useState(params.get("search") || "");
  const [view, setView] = useState("All tickets");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [picked, setPicked] = useState<string[]>([]);

  const count = (v: string) => v === "All tickets" ? tickets.length : tickets.filter(t => t.status === v).length;
  const filtered = useMemo(() => tickets.filter(t =>
    `${t.id} ${t.title} ${t.requester} ${t.status} ${t.priority} ${t.assignee}`.toLowerCase().includes(search.toLowerCase()) &&
    (view === "All tickets" || t.status === view)
  ), [tickets, search, view]);

  const create = () => {
    if (!title.trim()) return;
    setTickets(p => [{ id: `KH-${1001 + p.length}`, title: title.trim(), requester: "Lena Fischer", status: "Open", priority, assignee: "Unassigned", group: "Technical support", created: "just now" }, ...p]);
    setTitle(""); setPriority("Normal"); setOpen(false);
  };
  const toggle = (id: string) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return <>
    <PageHeader title="Tickets" action={<Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>New ticket</Button>} />
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "210px minmax(0,1fr)" }, gap: 2, alignItems: "start" }}>
      <Card sx={{ p: 1, display: { xs: "none", md: "block" } }}>
        <Typography sx={{ fontSize: ".75rem", color: "var(--ink-3)", fontWeight: 700, px: 1.2, pt: 0.8, pb: 0.5 }}>Views</Typography>
        {views.map(v => (
          <Box key={v} component="button" onClick={() => setView(v)} sx={{
            display: "flex", justifyContent: "space-between", width: "100%", border: 0, cursor: "pointer", font: "inherit", fontWeight: 700, fontSize: ".9rem",
            px: 1.2, py: 0.7, borderRadius: "6px", textAlign: "left",
            bgcolor: view === v ? "var(--primary-soft)" : "transparent", color: view === v ? "var(--primary)" : "var(--ink-2)", "&:hover": { bgcolor: view === v ? "var(--primary-soft)" : "var(--sunk)" }
          }}><span>{v}</span><Box component="span" sx={{ color: "var(--ink-3)" }}>{count(v)}</Box></Box>
        ))}
      </Card>

      <Card sx={{ p: 0, overflow: "hidden" }}>
        <Stack direction="row" alignItems="center" gap={1.5} sx={{ p: 1.5, borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: 34, px: 1.2, width: { xs: "100%", sm: 300 }, border: "1px solid var(--line-2)", borderRadius: "6px", "&:focus-within": { borderColor: "var(--primary)", boxShadow: "0 0 0 3px var(--primary-soft)" } }}>
            <Search sx={{ fontSize: 17, color: "var(--ink-3)" }} />
            <InputBase fullWidth placeholder="Search or #number" value={search} onChange={e => setSearch(e.target.value)} sx={{ fontSize: ".9rem" }} />
          </Box>
          <Typography sx={{ ml: "auto", color: "var(--ink-3)", fontSize: ".86rem" }}>{picked.length ? `${picked.length} selected · ` : ""}1–{filtered.length} of {filtered.length}</Typography>
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead><TableRow>
              <TableCell padding="checkbox" />
              {["Subject", "Requester", "Status", "Priority", "Agent", "Group", "Created"].map(x => <TableCell key={x}>{x}</TableCell>)}
            </TableRow></TableHead>
            <TableBody>
              {filtered.map(t => <TableRow key={t.id} hover selected={picked.includes(t.id)}>
                <TableCell padding="checkbox"><Checkbox size="small" checked={picked.includes(t.id)} onChange={() => toggle(t.id)} /></TableCell>
                <TableCell sx={{ minWidth: 220 }}><Typography component="span" sx={{ fontWeight: 700 }}>{t.title}</Typography> <Typography component="span" sx={{ color: "var(--ink-3)", fontSize: ".82rem", fontWeight: 700 }}>#{t.id}</Typography></TableCell>
                <TableCell><Stack direction="row" alignItems="center" gap={1}><UserAvatar name={t.requester} size={24} />{t.requester}</Stack></TableCell>
                <TableCell><StatusPill status={t.status} /></TableCell>
                <TableCell><PriorityMark priority={t.priority} /></TableCell>
                <TableCell sx={{ color: t.assignee === "Unassigned" ? "var(--ink-3)" : "inherit" }}>{t.assignee === "Unassigned" ? "—" : t.assignee}</TableCell>
                <TableCell>{t.group}</TableCell>
                <TableCell sx={{ color: "var(--ink-3)", whiteSpace: "nowrap" }}>{t.created}</TableCell>
              </TableRow>)}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} sx={{ textAlign: "center", py: 6, color: "var(--ink-3)" }}>No tickets match your filters.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>

    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Create ticket</DialogTitle>
      <DialogContent><Stack gap={2} sx={{ pt: 1 }}>
        <TextField label="Subject" value={title} onChange={e => setTitle(e.target.value)} fullWidth autoFocus />
        <TextField select label="Priority" value={priority} onChange={e => setPriority(e.target.value)}>{["Low", "Normal", "High", "Urgent"].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField>
      </Stack></DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="contained" onClick={create}>Create</Button></DialogActions>
    </Dialog>
  </>;
}
