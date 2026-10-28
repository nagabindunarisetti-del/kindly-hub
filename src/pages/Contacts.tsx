import { useState } from "react";
import { Button, Card, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
export default function Contacts() {
  const [contacts, setContacts] = useState([{ id: 1, name: "Priya Sharma", email: "priya@example.com", company: "Acme Ltd" }, { id: 2, name: "Arun Kumar", email: "arun@example.com", company: "Northstar" }, { id: 3, name: "Meera Rao", email: "meera@example.com", company: "Acme Ltd" }]);
  const [search, setSearch] = useState(""); const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const add = () => { if (!name.trim() || !email.trim()) return; setContacts(p => [...p, { id: Date.now(), name: name.trim(), email: email.trim(), company: "Not assigned" }]); setName(""); setEmail(""); };
  const filtered = contacts.filter(c => `${c.name} ${c.email} ${c.company}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageHeader title="Contacts" /><Card sx={{ p: 2.5, mb: 2 }}><Stack direction={{ xs: "column", md: "row" }} gap={2}><TextField label="Full name" value={name} onChange={e => setName(e.target.value)} fullWidth /><TextField label="Email address" value={email} onChange={e => setEmail(e.target.value)} fullWidth /><Button variant="contained" startIcon={<Add />} onClick={add}>Add</Button></Stack></Card>
    <Card sx={{ p: 2 }}><TextField fullWidth size="small" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} sx={{ mb: 2 }} /><Table><TableHead><TableRow>{["Name","Email","Company"].map(x => <TableCell key={x}>{x}</TableCell>)}</TableRow></TableHead><TableBody>{filtered.map(c => <TableRow key={c.id} hover><TableCell>{c.name}</TableCell><TableCell>{c.email}</TableCell><TableCell>{c.company}</TableCell></TableRow>)}</TableBody></Table></Card>
  </>;
}