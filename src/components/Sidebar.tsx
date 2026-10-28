import type React from "react";
import { Box, Tooltip } from "@mui/material";
import { SpaceDashboardOutlined, ConfirmationNumberOutlined, HeadsetMicOutlined, BugReportOutlined, ViewKanbanOutlined, InboxOutlined, CalendarMonthOutlined, GroupsOutlined, ViewQuiltOutlined, BoltOutlined, BarChartOutlined, SettingsOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Home", path: "/", icon: <SpaceDashboardOutlined /> },
  { label: "Tickets", path: "/tickets", icon: <ConfirmationNumberOutlined /> },
  { label: "ITSM", path: "/itsm", icon: <HeadsetMicOutlined /> },
  { label: "Issues", path: "/issues", icon: <BugReportOutlined /> },
  { label: "Boards", path: "/boards", icon: <ViewKanbanOutlined /> },
  { label: "Inbox", path: "/inbox", icon: <InboxOutlined /> },
  { label: "Planner", path: "/planner", icon: <CalendarMonthOutlined /> },
  { label: "Contacts", path: "/contacts", icon: <GroupsOutlined /> },
  { label: "Templates", path: "/templates", icon: <ViewQuiltOutlined /> },
  { label: "Automation", path: "/automation", icon: <BoltOutlined /> },
  { label: "Analytics", path: "/analytics", icon: <BarChartOutlined /> }
];
const settings = { label: "Settings", path: "/settings", icon: <SettingsOutlined /> };

const linkSx = {
  width: 42, height: 42, borderRadius: "10px", display: "grid", placeItems: "center", flex: "none",
  color: "var(--rail-ink)", position: "relative", textDecoration: "none",
  "& svg": { fontSize: 21 },
  "&:hover": { background: "rgba(255,255,255,.08)", color: "#fff" },
  "&.active": { background: "rgba(255,255,255,.14)", color: "#fff" },
  "&.active::before": { content: '""', position: "absolute", left: "-9px", top: 10, bottom: 10, width: 3, borderRadius: "0 3px 3px 0", background: "var(--hl)" },
  "@media (max-width:760px)": { "&.active::before": { left: 10, right: 10, top: "auto", bottom: -8, width: "auto", height: 3, borderRadius: 3 } }
};

const RailLink = ({ item }: { item: { label: string; path: string; icon: React.ReactNode } }) => (
  <Tooltip title={item.label} placement="right" arrow>
    <Box component={NavLink} to={item.path} end={item.path === "/"} aria-label={item.label} sx={linkSx}>{item.icon}</Box>
  </Tooltip>
);

export default function Sidebar() {
  return (
    <Box component="nav" aria-label="Main" className="no-scrollbar" sx={{
      position: "fixed", inset: "0 auto 0 0", width: 60, bgcolor: "var(--rail)", zIndex: 30,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", py: 1.4, overflowY: "auto",
      "@media (max-width:760px)": { inset: "auto 0 0 0", width: "auto", height: 58, flexDirection: "row", justifyContent: "flex-start", py: 0, px: 0.5, overflowX: "auto", overflowY: "hidden" }
    }}>
      <Box sx={{ width: 34, height: 34, borderRadius: "9px", bgcolor: "var(--primary)", display: "grid", placeItems: "center", mb: 1.2, flex: "none", "&::after": { content: '""', width: 12, height: 12, borderRadius: "50%", bgcolor: "var(--hl)" }, "@media (max-width:760px)": { display: "none" } }} />
      {items.map(i => <RailLink key={i.path} item={i} />)}
      <Box sx={{ flex: 1, "@media (max-width:760px)": { display: "none" } }} />
      <RailLink item={settings} />
    </Box>
  );
}
