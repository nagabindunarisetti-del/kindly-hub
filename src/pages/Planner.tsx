import { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
export default function Planner() {
  const [events, setEvents] = useState([{ id: 1, date: "2026-10-27", title: "Review overdue tickets" }, { id: 2, date: "2026-10-28", title: "Support team meeting" }]);
  const [date, setDate] = useState("2026-10-27"); const [title, setTitle] = useState("");
  const add = () => { if (!title.trim() || !date) return; setEvents(p => [...p, { id: Date.now(), date, title: title.trim() }]); setTitle(""); };
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return <><PageHeader title="Planner" /><Card sx={{ p: 2.5, mb: 2 }}><Typography variant="h6" mb={2}>October 2026</Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", gap: 1 }}>{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <Typography key={d} color="text.secondary" textAlign="center">{d}</Typography>)}
      {days.map((day, index) => { const list = events.filter(e => e.date === `2026-10-${String(day).padStart(2,"0")}`); return <Card key={index} variant="outlined" sx={{ p: 1, minHeight: 75, borderColor: day === 27 ? "primary.main" : "divider" }}><Typography variant="body2">{day > 0 && day <= 31 ? day : ""}</Typography>{list.map(e => <Typography key={e.id} fontSize={11} color="primary.light" sx={{ overflowWrap: "anywhere" }}>{e.title}</Typography>)}</Card>; })}
    </Box></Card>
    <Card sx={{ p: 2.5 }}><Typography variant="h6" mb={2}>Add planner item</Typography><Stack direction={{ xs: "column", sm: "row" }} gap={2}><TextField label="Event name" fullWidth value={title} onChange={e => setTitle(e.target.value)} /><TextField type="date" label="Date" value={date} onChange={e => setDate(e.target.value)} InputLabelProps={{ shrink: true }} /><Button variant="contained" startIcon={<Add />} onClick={add}>Add</Button></Stack></Card>
  </>;
}