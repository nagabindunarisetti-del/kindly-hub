import { Box, Card, Typography } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
const weekly = [{ day: "Mon", received: 18, resolved: 15 }, { day: "Tue", received: 24, resolved: 20 }, { day: "Wed", received: 20, resolved: 17 }, { day: "Thu", received: 30, resolved: 24 }, { day: "Fri", received: 25, resolved: 21 }, { day: "Sat", received: 12, resolved: 10 }, { day: "Sun", received: 9, resolved: 8 }];
const csat = [{ name: "Positive", value: 80 }, { name: "Neutral", value: 7 }, { name: "Negative", value: 13 }];
const colors = ["var(--ok)", "var(--c3)", "var(--bad)"];
const tip = { contentStyle: { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--ink)", fontSize: 13 } };
export default function Analytics() {
  return <><PageHeader title="Analytics" /><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4,1fr)" }, gap: 2, mb: 2 }}><StatCard title="Tickets received" value="138" /><StatCard title="Tickets resolved" value="115" /><StatCard title="Average response" value="2h 21m" /><StatCard title="SLA achievement" value="52%" /></Box>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 2 }}><Card sx={{ p: 2.5 }}><Typography variant="h6">Tickets received vs resolved</Typography><Typography color="text.secondary" mb={2}>Weekly overview</Typography><Box sx={{ height: 330 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={weekly}><CartesianGrid stroke="var(--line)" vertical={false} /><XAxis dataKey="day" stroke="var(--ink-3)" tickLine={false} axisLine={false} /><YAxis stroke="var(--ink-3)" tickLine={false} axisLine={false} /><Tooltip {...tip} /><Bar dataKey="received" fill="var(--c1)" radius={[4,4,0,0]} /><Bar dataKey="resolved" fill="var(--c2)" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></Box></Card>
      <Card sx={{ p: 2.5 }}><Typography variant="h6">Customer satisfaction</Typography><Box sx={{ height: 260 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={csat} dataKey="value" nameKey="name" outerRadius={85} label>{csat.map((x,i) => <Cell key={x.name} fill={colors[i]} />)}</Pie><Tooltip {...tip} /></PieChart></ResponsiveContainer></Box>{csat.map((x,i) => <Typography key={x.name} mb={1}><Box component="span" sx={{ color: colors[i] }}>■ </Box>{x.name}: {x.value}%</Typography>)}</Card>
    </Box></>;
}