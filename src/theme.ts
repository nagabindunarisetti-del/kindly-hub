import { createTheme } from "@mui/material/styles";

// Same palette as Kindly Desk 2. Light by default, dark follows the OS setting.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "media" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#3346d3", dark: "#2836b8", contrastText: "#fff" },
        background: { default: "#f5f6fa", paper: "#ffffff" },
        text: { primary: "#1d2433", secondary: "#5b657a" },
        divider: "#e1e4ee",
        success: { main: "#15803d" },
        error: { main: "#c81e1e" },
        warning: { main: "#b45309" },
        info: { main: "#3346d3" }
      }
    },
    dark: {
      palette: {
        primary: { main: "#7d8cff", dark: "#95a1ff", contrastText: "#0d1020" },
        background: { default: "#12151d", paper: "#1a1e29" },
        text: { primary: "#e8ebf3", secondary: "#b4bccd" },
        divider: "#2d3343",
        success: { main: "#4ade80" },
        error: { main: "#f87171" },
        warning: { main: "#f59e0b" },
        info: { main: "#8e9bff" }
      }
    }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Atkinson Hyperlegible", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    fontSize: 15,
    h1: { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-.01em" },
    h2: { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-.01em" },
    h3: { fontFamily: "var(--font-display)", fontWeight: 700 },
    h4: { fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-.01em" },
    h5: { fontFamily: "var(--font-display)", fontWeight: 800 },
    h6: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem" },
    button: { textTransform: "none", fontWeight: 700 }
  },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundImage: "none", boxShadow: "none", border: "1px solid var(--line)", borderRadius: 10 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { height: 36, borderRadius: 6, padding: "0 14px", fontSize: ".9rem" },
        outlined: { borderColor: "var(--line-2)", color: "var(--ink)", "&:hover": { borderColor: "var(--ink-3)", background: "transparent" } },
        text: { color: "var(--ink)", "&:hover": { background: "var(--sunk)" } },
        containedPrimary: { background: "var(--primary)", color: "var(--primary-ink)", "&:hover": { background: "var(--primary-hover)" } }
      }
    },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6, background: "var(--surface)",
          "& fieldset": { borderColor: "var(--line-2)" },
          "&:hover fieldset": { borderColor: "var(--ink-3)" },
          "&.Mui-focused fieldset": { borderColor: "var(--primary)", borderWidth: 1 },
          "&.Mui-focused": { boxShadow: "0 0 0 3px var(--primary-soft)" }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid var(--line)", padding: "10px 12px", fontSize: ".92rem" },
        head: { color: "var(--ink-3)", fontSize: ".8rem", fontWeight: 700, whiteSpace: "nowrap" }
      }
    },
    MuiTableRow: { styleOverrides: { root: { "&.MuiTableRow-hover:hover": { background: "var(--sunk)" }, "&:last-child td": { borderBottom: 0 } } } },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: ".78rem", borderRadius: 99, background: "var(--sunk)", color: "var(--ink-2)", height: 24 },
        colorInfo: { background: "var(--primary-soft)", color: "var(--primary)" },
        colorSuccess: { background: "var(--ok-soft)", color: "var(--ok)" },
        colorError: { background: "var(--bad-soft)", color: "var(--bad)" },
        colorWarning: { background: "var(--warn-soft)", color: "var(--warn)" }
      }
    },
    MuiListItemButton: { styleOverrides: { root: { "&.Mui-selected": { background: "var(--primary-soft)" }, "&.Mui-selected:hover": { background: "var(--primary-soft)" } } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16, boxShadow: "var(--pop)" } } },
    MuiMenu: { styleOverrides: { paper: { border: "1px solid var(--line)", boxShadow: "var(--pop)", borderRadius: 10 } } },
    MuiTooltip: { styleOverrides: { tooltip: { background: "var(--ink)", color: "var(--paper)", fontWeight: 700, fontSize: ".8rem" } } },
    MuiSwitch: { styleOverrides: { switchBase: { "&.Mui-checked + .MuiSwitch-track": { backgroundColor: "var(--ok)", opacity: 1 } } } },
    MuiAlert: { styleOverrides: { root: { borderRadius: 10 } } }
  }
});

export default theme;
