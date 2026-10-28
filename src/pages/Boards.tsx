import { useState } from "react";
import { Box, Button, Card, Chip, Stack, TextField, Typography, MenuItem } from "@mui/material";
import { Add } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
const initial = { "To do": [{ id: 1, title: "Create customer portal" }, { id: 2, title: "Review ticket categories" }], "In progress": [{ id: 3, title: "Build dashboard" }], Done: [{ id: 4, title: "Set up navigation" }] };
export default function Boards() {
  const [columns, setColumns] = useState(initial);
  const [task, setTask] = useState("");
  const [column, setColumn] = useState("To do");
  const addTask = () => { if (!task.trim()) return; setColumns(p => ({ ...p, [column]: [...p[column], { id: Date.now(), title: task.trim() }] })); setTask(""); };
  return <><PageHeader title="Boards" />
    <Stack direction={{ xs: "column", sm: "row" }} gap={1} mb={2}>
      <TextField fullWidth size="small" label="Task name" value={task} onChange={e => setTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} />
      <TextField select size="small" label="Column" value={column} onChange={e => setColumn(e.target.value)} sx={{ minWidth: 160 }}>{Object.keys(columns).map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField>
      <Button variant="contained" startIcon={<Add />} onClick={addTask}>Add task</Button>
    </Stack>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2, alignItems: "start" }}>
      {Object.entries(columns).map(([name, tasks]) => <Card key={name} sx={{ p: 1.5, minHeight: 300, bgcolor: "var(--sunk)", border: 0 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}><Typography sx={{ fontSize: ".78rem", fontWeight: 700, letterSpacing: ".02em", color: "var(--ink-2)", textTransform: "uppercase" }}>{name}</Typography><Chip label={tasks.length} size="small" /></Stack>
        {tasks.map(t => <Card key={t.id} variant="outlined" sx={{ p: 1.4, mb: 1, bgcolor: "var(--surface)", borderLeft: "4px solid var(--primary)", cursor: "grab", boxShadow: "0 1px 1px rgba(9,30,66,.12)" }}><Typography sx={{ fontWeight: 700, fontSize: ".93rem" }}>{t.title}</Typography><Typography variant="caption" color="text.secondary">Task #{t.id}</Typography></Card>)}
      </Card>)}
    </Box>
  </>;
}