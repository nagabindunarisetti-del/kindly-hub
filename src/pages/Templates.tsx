import { useState } from "react";
import { Box, Button, Card, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Typography } from "@mui/material";
import { Add, ContentCopyOutlined } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
export default function Templates() {
  const [items, setItems] = useState([{ id: 1, title: "Welcome reply", body: "Thank you for contacting support. We will review your request." }, { id: 2, title: "Password reset", body: "Please use the password reset option on the sign-in page." }, { id: 3, title: "Issue resolved", body: "The reported issue has been resolved. Please let us know if you need more help." }]);
  const [open, setOpen] = useState(false); const [title, setTitle] = useState(""); const [body, setBody] = useState(""); const [copied, setCopied] = useState("");
  const add = () => { if (!title.trim() || !body.trim()) return; setItems(p => [...p, { id: Date.now(), title: title.trim(), body: body.trim() }]); setTitle(""); setBody(""); setOpen(false); };
  const copy = async text => { try { await navigator.clipboard.writeText(text); setCopied(text); } catch { setCopied(""); } };
  return <><PageHeader title="Templates" action={<Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>New template</Button>} />
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" }, gap: 2 }}>{items.map(t => <Card key={t.id} sx={{ p: 2.5 }}><Typography variant="h6">{t.title}</Typography><Typography color="text.secondary" my={2}>{t.body}</Typography><Button startIcon={<ContentCopyOutlined />} onClick={() => copy(t.body)}>{copied === t.body ? "Copied" : "Copy reply"}</Button></Card>)}</Box>
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm"><DialogTitle>Create template</DialogTitle><DialogContent><Stack gap={2} sx={{ pt: 1 }}><TextField label="Template name" value={title} onChange={e => setTitle(e.target.value)} /><TextField label="Reply content" multiline minRows={4} value={body} onChange={e => setBody(e.target.value)} /></Stack></DialogContent><DialogActions><Button onClick={() => setOpen(false)}>Cancel</Button><Button variant="contained" onClick={add}>Save template</Button></DialogActions></Dialog>
  </>;
}