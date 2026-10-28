import { Box, Button, Card, Typography } from "@mui/material";
import { SupportAgent, Devices, Assignment, BuildCircle } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
const modules = [
  { title: "Service requests", description: "Review and manage employee service requests.", icon: <SupportAgent /> },
  { title: "Assets", description: "Track devices, equipment, and assigned assets.", icon: <Devices /> },
  { title: "Change management", description: "Coordinate planned service changes.", icon: <Assignment /> },
  { title: "Problem management", description: "Investigate recurring incidents and root causes.", icon: <BuildCircle /> }
];
export default function ITSM() {
  return <><PageHeader title="ITSM" /><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)", xl: "repeat(4,1fr)" }, gap: 2 }}>
    {modules.map(m => <Card key={m.title} sx={{ p: 3, transition: "border-color .15s", "&:hover": { borderColor: "var(--primary)" } }}><Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "var(--primary-soft)", color: "primary.main", display: "grid", placeItems: "center" }}>{m.icon}</Box><Typography variant="h6" mt={2}>{m.title}</Typography><Typography color="text.secondary" my={2}>{m.description}</Typography><Button variant="outlined">Open module</Button></Card>)}
  </Box></>;
}