import { Box, Typography, Button } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />
      <Box sx={{ ml: "60px", minHeight: "100vh", display: "flex", flexDirection: "column", "@media (max-width:760px)": { ml: 0, pb: "60px" } }}>
        <Navbar />
        <Box sx={{ px: { xs: 2, md: 2 }, py: 0.8, bgcolor: "var(--trial)", color: "var(--ink)", display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", fontSize: ".9rem" }}>
          <Typography fontSize="inherit">Hi ONAS Global, your workspace is <b>60%</b> set up.</Typography>
          <Button size="small" variant="outlined" startIcon={<AutoAwesome sx={{ fontSize: 15 }} />} onClick={() => navigate("/settings")} sx={{ height: 28, bgcolor: "var(--surface)" }}>Continue setup</Button>
          <Typography fontSize="inherit" sx={{ ml: "auto", color: "var(--ink-2)", display: { xs: "none", lg: "block" } }}>Need help? Search for what you are looking for.</Typography>
        </Box>
        <Box component="main" sx={{ p: { xs: 2, md: "20px 24px 48px" }, width: "100%", maxWidth: 1900, mx: "auto", flex: 1 }}><Outlet /></Box>
      </Box>
    </Box>
  );
}
