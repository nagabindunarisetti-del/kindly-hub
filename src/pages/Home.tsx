import { useState } from "react";
import { Box, Card, Typography, Stack, Button, IconButton, InputBase, Checkbox, Link as MuiLink } from "@mui/material";
import { Add, Close, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";

const today = [2, 1, 2, 0, 1, 0, 3, 1, 0, 0, 0, 1, 1, 2, 1, 1, 0];
const yesterday = [1, 0, 0, 0, 1, 1, 2, 1, 1, 2, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0, 0, 1, 0];
const data = yesterday.map((y, hour) => ({ hour, yesterday: y, today: hour < today.length ? today[hour] : null }));
const stats: [string, number, boolean?][] = [["Unresolved", 40], ["Overdue", 40, true], ["Due today", 0], ["Open", 40], ["On hold", 0], ["Unassigned", 9, true]];
const metrics = [["Resolved", "14"], ["Received", "16"], ["Average first response time", "2h 21m"], ["Average response time", "2h 21m"], ["Resolution within SLA", "52%"]];
const tip = { contentStyle: { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--ink)", fontSize: 13 } };

const Panel = ({ title, sub, link, to, children, sx }: any) => (
  <Card sx={{ p: "16px 18px", ...sx }}>
    <Stack direction="row" alignItems="baseline" justifyContent="space-between" mb={sub ? 0 : 1.5}>
      <Typography variant="h6">{title}</Typography>
      {link && <MuiLink component={Link} to={to} underline="always" sx={{ fontSize: ".86rem", color: "var(--primary)" }}>{link}</MuiLink>}
    </Stack>
    {sub && <Typography sx={{ color: "var(--ink-3)", fontSize: ".86rem", mb: 1.5 }}>{sub}</Typography>}
    {children}
  </Card>
);

function TodoWidget() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([{ id: 1, text: "Prepare weekly support report", done: false }, { id: 2, text: "Follow up with customer about upgrade", done: false }]);
  const add = () => { if (text.trim()) { setItems(p => [...p, { id: Date.now(), text: text.trim(), done: false }]); setText(""); } };
  return <>
    <Stack direction="row" alignItems="center" gap={1} sx={{ color: "var(--ink-3)", mb: 1 }}>
      <Add sx={{ fontSize: 18 }} /><InputBase fullWidth placeholder="Add a to-do" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} />
    </Stack>
    {items.length === 0 && <Typography sx={{ color: "var(--ink-3)", py: 1 }}>Nothing to do. Nice.</Typography>}
    {items.map(item => (
      <Stack key={item.id} direction="row" alignItems="center" gap={0.5} sx={{ py: 0.3, borderTop: "1px solid var(--line)", "&:hover .del": { opacity: 1 } }}>
        <Checkbox size="small" checked={item.done} onChange={() => setItems(p => p.map(i => i.id === item.id ? { ...i, done: !i.done } : i))} />
        <Typography sx={{ flex: 1, textDecoration: item.done ? "line-through" : "none", color: item.done ? "var(--ink-3)" : "inherit" }}>{item.text}</Typography>
        <IconButton className="del" size="small" aria-label="Delete" sx={{ opacity: 0 }} onClick={() => setItems(p => p.filter(i => i.id !== item.id))}><Close fontSize="small" /></IconButton>
      </Stack>
    ))}
  </>;
}

export default function Home() {
  return <Stack gap={1.5}>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2,1fr)", md: "repeat(3,1fr)", xl: "repeat(6,1fr)" }, gap: 1.5 }}>
      {stats.map(([title, value, danger]) => <StatCard key={title} title={title} value={value} danger={danger} />)}
    </Box>

    <Panel title="Today's trends">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0,1fr) 280px" }, gap: 3, alignItems: "center" }}>
        <Box>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--ink-3)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--ink-3)" domain={[0, 3]} ticks={[0, 1.5, 3]} tickLine={false} axisLine={false} />
                <Tooltip {...tip} />
                <Area dataKey="today" name="Today" type="linear" stroke="var(--c1)" strokeWidth={3} fill="var(--c1)" fillOpacity={0.08} dot={{ r: 4, fill: "var(--surface)", stroke: "var(--c1)", strokeWidth: 2 }} connectNulls={false} />
                <Line dataKey="yesterday" name="Yesterday" stroke="var(--line-2)" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" gap={2} sx={{ fontSize: ".82rem", color: "var(--ink-2)", flexWrap: "wrap", pl: 1 }}>
            <span><Box component="i" sx={{ display: "inline-block", width: 10, height: 10, borderRadius: "2px", bgcolor: "var(--c1)", mr: 0.6 }} />Today</span>
            <span><Box component="i" sx={{ display: "inline-block", width: 10, height: 10, borderRadius: "2px", bgcolor: "var(--line-2)", mr: 0.6 }} />Yesterday</span>
            <Box component="span" sx={{ color: "var(--ink-3)" }}>Tickets received per hour</Box>
          </Stack>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3,1fr)", lg: "1fr 1fr" }, gap: "20px 16px", borderLeft: { lg: "1px solid var(--line)" }, pl: { lg: 3 } }}>
          {metrics.map(([l, v]) => <Box key={l}><Typography sx={{ color: "var(--ink-3)", fontSize: ".85rem" }}>{l}</Typography><Typography sx={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 800 }}>{v}</Typography></Box>)}
        </Box>
      </Box>
    </Panel>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(3,1fr)" }, gap: 1.5 }}>
      <Panel title="Unresolved tickets" sub="Across helpdesk" link="View details" to="/tickets">
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", "& th": { textAlign: "left", fontSize: ".8rem", color: "var(--ink-3)", p: "8px 4px", borderBottom: "1px solid var(--line)" }, "& td": { p: "10px 4px", borderBottom: "1px solid var(--line)" }, "& tr:last-child td": { borderBottom: 0 } }}>
          <thead><tr><th>Group</th><th>Open</th><th>On hold</th></tr></thead>
          <tbody>{[["Technical support", 25, 0], ["Access & accounts", 8, 0], ["Billing", 7, 0]].map(([g, o, h]) => <tr key={g}><td>{g}</td><td>{o}</td><td>{h}</td></tr>)}</tbody>
        </Box>
      </Panel>
      <Panel title="Customer satisfaction" sub="Last 30 days" link="Report" to="/analytics">
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Box><Typography sx={{ color: "var(--ink-3)", fontSize: ".9rem" }}>Responses received</Typography><Typography sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800 }}>59</Typography></Box>
          <Box textAlign="right"><Typography sx={{ color: "var(--ink-3)", fontSize: ".9rem" }}>Positive</Typography><Typography sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--ok)" }}>80%</Typography></Box>
        </Stack>
        <Box sx={{ display: "flex", height: 12, borderRadius: "6px", overflow: "hidden", bgcolor: "var(--sunk)", my: 1.2 }}>
          <Box sx={{ width: "80%", bgcolor: "var(--ok)" }} /><Box sx={{ width: "7%", bgcolor: "var(--c3)" }} /><Box sx={{ width: "13%", bgcolor: "var(--bad)" }} />
        </Box>
        <Stack direction="row" gap={2} sx={{ fontSize: ".82rem", color: "var(--ink-2)", flexWrap: "wrap" }}>
          {[["Positive 80%", "var(--ok)"], ["Neutral 7%", "var(--c3)"], ["Negative 13%", "var(--bad)"]].map(([l, c]) => <span key={l}><Box component="i" sx={{ display: "inline-block", width: 10, height: 10, borderRadius: "2px", bgcolor: c, mr: 0.6 }} />{l}</span>)}
        </Stack>
      </Panel>
      <Panel title="To-do"><TodoWidget /></Panel>
    </Box>

    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 1.5 }}>
      <Panel title="Recent activities">
        {["Rule: Close tickets waiting on the customer for 3 days moved this from On Hold to Resolved on VPN drops every 30 minutes", "Rule: Close tickets waiting on the customer for 3 days replied to the requester on VPN drops every 30 minutes", "Rule: Flag first-response SLA breaches to admins set labels to sla-breach on Access to Process Mining Workspace"].map((a, i) =>
          <Stack key={i} direction="row" gap={1.2} alignItems="flex-start" sx={{ py: 1.2, borderTop: "1px solid var(--line)" }}>
            <Box sx={{ width: 8, height: 8, mt: "8px", borderRadius: "50%", bgcolor: "var(--primary)", flex: "none" }} /><Typography sx={{ color: "var(--ink-2)" }}>{a}</Typography>
          </Stack>)}
      </Panel>
      <Panel title="Set up your workspace">
        {["Personalize your workspace", "Connect a support channel", "Turn on an automation rule", "Create a space from a template", "Connect an AI tool through MCP"].map((item, i) => {
          const done = [1, 2, 3].includes(i);
          return <Stack key={item} direction="row" gap={1.2} alignItems="center" sx={{ py: 0.9, color: done ? "var(--ink-3)" : "var(--ink)" }}>
            {done ? <CheckCircle sx={{ fontSize: 20, color: "var(--ok)" }} /> : <RadioButtonUnchecked sx={{ fontSize: 20, color: "var(--primary)" }} />}
            <Typography sx={{ textDecoration: done ? "line-through" : "none", fontWeight: done ? 400 : 700 }}>{item}</Typography>
          </Stack>;
        })}
        <Button variant="contained" sx={{ mt: 1.5 }} component={Link} to="/settings">Continue setup</Button>
      </Panel>
    </Box>
  </Stack>;
}
