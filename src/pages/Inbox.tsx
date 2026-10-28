import { useState } from "react";
import { Box, Button, Card, Divider, List, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
const seed = [
  { id: 1, name: "Priya Sharma", subject: "Cannot access my account", preview: "I tried resetting my password..." },
  { id: 2, name: "Arun Kumar", subject: "Invoice question", preview: "Could you please check my invoice?" },
  { id: 3, name: "Meera Rao", subject: "Application error", preview: "The page shows an error..." }
];
export default function Inbox() {
  const [selected, setSelected] = useState(seed[0]);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState([]);
  const send = () => { if (!reply.trim()) return; setSent(p => [...p, { subject: selected.subject, text: reply.trim() }]); setReply(""); };
  return <><PageHeader title="Inbox" /><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "320px 1fr" }, gap: 2 }}>
    <Card sx={{ p: 1 }}><Typography variant="h6" p={1.5}>Conversations</Typography><Divider /><List disablePadding>{seed.map(m => <ListItemButton key={m.id} selected={selected.id === m.id} onClick={() => setSelected(m)} sx={{ py: 2 }}><ListItemText primary={m.name} secondary={`${m.subject}\n${m.preview}`} secondaryTypographyProps={{ whiteSpace: "pre-line" }} /></ListItemButton>)}</List></Card>
    <Card sx={{ p: 2.5, minHeight: 450, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6">{selected.subject}</Typography><Typography color="text.secondary" mb={2}>Conversation with {selected.name}</Typography><Divider />
      <Box sx={{ flex: 1, py: 3 }}><Typography fontWeight={700}>{selected.name}</Typography><Typography color="text.secondary" mt={1}>{selected.preview}</Typography>
        {sent.filter(m => m.subject === selected.subject).map((m, i) => <Box key={i} sx={{ mt: 2, ml: "auto", p: 2, maxWidth: "80%", bgcolor: "var(--primary-soft)", borderRadius: 2 }}><Typography variant="caption">Your reply</Typography><Typography>{m.text}</Typography></Box>)}
      </Box>
      <Stack gap={1}><TextField multiline minRows={3} placeholder="Write a reply..." value={reply} onChange={e => setReply(e.target.value)} /><Button variant="contained" onClick={send} sx={{ alignSelf: "flex-end" }}>Send reply</Button></Stack>
    </Card>
  </Box></>;
}