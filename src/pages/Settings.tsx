import { useState } from "react";
import { Button, Card, Divider, Stack, Switch, TextField, Typography, Snackbar, Alert } from "@mui/material";
import PageHeader from "../components/PageHeader";
export default function Settings() {
  const [workspace, setWorkspace] = useState("ONAS Global");
  const [email, setEmail] = useState("support@example.com");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  const save = () => { localStorage.setItem("kindlyHubSettings", JSON.stringify({ workspace, email, notifications })); setSaved(true); };
  return <><PageHeader title="Settings" /><Card sx={{ p: { xs: 2, md: 3 }, maxWidth: 850 }}><Typography variant="h6">Workspace settings</Typography><Typography color="text.secondary" mb={3}>Manage your workspace preferences.</Typography><Stack gap={2.5}>
    <TextField label="Workspace name" fullWidth value={workspace} onChange={e => setWorkspace(e.target.value)} /><TextField label="Support email" fullWidth value={email} onChange={e => setEmail(e.target.value)} /><Divider />
    <Stack direction="row" alignItems="center" justifyContent="space-between"><Stack><Typography fontWeight={650}>Email notifications</Typography><Typography color="text.secondary" variant="body2">Receive alerts for ticket updates.</Typography></Stack><Switch checked={notifications} onChange={e => setNotifications(e.target.checked)} /></Stack>
    <Button variant="contained" onClick={save} sx={{ alignSelf: "flex-start" }}>Save settings</Button>
  </Stack></Card><Snackbar open={saved} autoHideDuration={3000} onClose={() => setSaved(false)}><Alert severity="success" onClose={() => setSaved(false)}>Demo settings saved in this browser.</Alert></Snackbar></>;
}