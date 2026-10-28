import { ReactNode } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { Refresh } from "@mui/icons-material";

// The page title lives in the top bar (like Kindly Desk); here we keep a screen-reader heading and the action row.
export default function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={1.5} mb={2}>
      <Typography component="h1" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{title}</Typography>
      {action || <Button variant="outlined" startIcon={<Refresh sx={{ fontSize: 17 }} />} onClick={() => window.location.reload()}>Refresh</Button>}
    </Stack>
  );
}
