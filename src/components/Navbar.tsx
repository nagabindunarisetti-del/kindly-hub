import { useState } from "react";
import { Box, Button, IconButton, Badge, Avatar, Menu, MenuItem, InputBase } from "@mui/material";
import { Search, Add, NotificationsNone, HelpOutline, StarBorder, Star, GridViewOutlined, KeyboardArrowDown } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "Dashboard", "/tickets": "All tickets", "/itsm": "ITSM", "/issues": "Issues", "/boards": "Boards", "/inbox": "Inbox",
  "/planner": "Planner", "/contacts": "Contacts", "/templates": "Templates", "/automation": "Automation", "/analytics": "Analytics", "/settings": "Settings"
};

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [bell, setBell] = useState<HTMLElement | null>(null);
  const [create, setCreate] = useState<HTMLElement | null>(null);
  const [faved, setFaved] = useState<Record<string, boolean>>({});
  const title = titles[pathname] ?? "Kindly Hub";
  const fav = !!faved[pathname];

  return (
    <Box component="header" sx={{
      height: 56, display: "flex", alignItems: "center", gap: 1, pl: 1.5, pr: 2, bgcolor: "var(--surface)",
      borderBottom: "1px solid var(--line)", position: "sticky", top: 0, zIndex: 20
    }}>
      <Button variant="text" size="small" startIcon={<GridViewOutlined sx={{ fontSize: 17 }} />} onClick={() => navigate("/")} sx={{ height: 32, display: { xs: "none", sm: "inline-flex" } }}>All</Button>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>
        <Box component="span" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</Box>
        <IconButton size="small" aria-label="Favorite" aria-pressed={fav} onClick={() => setFaved(p => ({ ...p, [pathname]: !p[pathname] }))} sx={{ color: fav ? "#e2a400" : "var(--ink-3)" }}>
          {fav ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
        </IconButton>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, height: 36, px: 1.2, width: 280, border: "1px solid var(--line-2)", borderRadius: "6px", bgcolor: "var(--surface)", "&:focus-within": { borderColor: "var(--primary)", boxShadow: "0 0 0 3px var(--primary-soft)" } }}>
        <Search sx={{ fontSize: 17, color: "var(--ink-3)" }} />
        <InputBase fullWidth placeholder="Search tickets, work items, contacts" value={search} inputProps={{ "aria-label": "Search" }}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && search.trim()) navigate(`/tickets?search=${encodeURIComponent(search)}`); }}
          sx={{ fontSize: ".9rem" }} />
      </Box>
      <Button variant="outlined" startIcon={<Add sx={{ fontSize: 17 }} />} endIcon={<KeyboardArrowDown sx={{ fontSize: 17 }} />} onClick={e => setCreate(e.currentTarget)}>New</Button>
      <Menu anchorEl={create} open={Boolean(create)} onClose={() => setCreate(null)}>
        <MenuItem onClick={() => { navigate("/tickets"); setCreate(null); }}>New ticket</MenuItem>
        <MenuItem onClick={() => { navigate("/boards"); setCreate(null); }}>New board task</MenuItem>
        <MenuItem onClick={() => { navigate("/contacts"); setCreate(null); }}>New contact</MenuItem>
      </Menu>
      <IconButton aria-label="Notifications" onClick={e => setBell(e.currentTarget)}><Badge badgeContent={1} color="error"><NotificationsNone /></Badge></IconButton>
      <Menu anchorEl={bell} open={Boolean(bell)} onClose={() => setBell(null)}>
        <MenuItem onClick={() => setBell(null)}>You have 1 new notification</MenuItem>
        <MenuItem onClick={() => { navigate("/tickets"); setBell(null); }}>Review tickets</MenuItem>
      </Menu>
      <IconButton aria-label="Help" sx={{ display: { xs: "none", sm: "inline-flex" } }}><HelpOutline /></IconButton>
      <Avatar sx={{ width: 28, height: 28, bgcolor: "#0f766e", color: "#fff", fontSize: ".7rem", fontWeight: 700 }}>LF</Avatar>
    </Box>
  );
}
