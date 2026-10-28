import { useState } from "react";
import { Card, Stack, Switch, Typography, Chip } from "@mui/material";
import PageHeader from "../components/PageHeader";
const initial = [{ id: 1, name: "Close tickets waiting on customer", trigger: "After 3 days", enabled: true }, { id: 2, name: "Flag first-response SLA breaches", trigger: "When SLA is breached", enabled: true }, { id: 3, name: "Notify support team", trigger: "When a ticket is assigned", enabled: false }];
export default function Automation() {
  const [rules, setRules] = useState(initial);
  const toggle = id => setRules(p => p.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  return <><PageHeader title="Automation" /><Stack gap={2}>{rules.map(r => <Card key={r.id} sx={{ p: 2.5 }}><Stack direction="row" alignItems="center" gap={2}><Stack flex={1} gap={0.7}><Typography variant="h6">{r.name}</Typography><Typography color="text.secondary">{r.trigger}</Typography><Chip label={r.enabled ? "Enabled" : "Disabled"} color={r.enabled ? "success" : "default"} size="small" sx={{ alignSelf: "flex-start" }} /></Stack><Switch checked={r.enabled} onChange={() => toggle(r.id)} /></Stack></Card>)}</Stack></>;
}