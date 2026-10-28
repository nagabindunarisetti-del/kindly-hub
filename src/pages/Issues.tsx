import { useState } from "react";
import { Card, Chip, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import PageHeader from "../components/PageHeader";
const seed = [
  { id: "ISS-101", title: "Login failure", owner: "Support", status: "Investigating" },
  { id: "ISS-102", title: "Slow dashboard loading", owner: "Engineering", status: "Open" },
  { id: "ISS-103", title: "Email notification delay", owner: "Operations", status: "Resolved" }
];
export default function Issues() {
  const [filter, setFilter] = useState("All");
  const rows = seed.filter(i => filter === "All" || i.status === filter);
  return <><PageHeader title="Issues" /><Card sx={{ p: 2 }}>
    <Stack direction="row" justifyContent="flex-end" mb={2}><TextField select label="Status" size="small" value={filter} onChange={e => setFilter(e.target.value)} sx={{ minWidth: 180 }}>{["All","Open","Investigating","Resolved"].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField></Stack>
    <Table><TableHead><TableRow>{["ID","Issue","Owner","Status"].map(x => <TableCell key={x}>{x}</TableCell>)}</TableRow></TableHead>
      <TableBody>{rows.map(i => <TableRow key={i.id} hover><TableCell>{i.id}</TableCell><TableCell>{i.title}</TableCell><TableCell>{i.owner}</TableCell><TableCell><Chip label={i.status} size="small" /></TableCell></TableRow>)}</TableBody>
    </Table>
  </Card></>;
}