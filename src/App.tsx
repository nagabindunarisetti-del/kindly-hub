import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import ITSM from "./pages/ITSM";
import Issues from "./pages/Issues";
import Boards from "./pages/Boards";
import Inbox from "./pages/Inbox";
import Planner from "./pages/Planner";
import Contacts from "./pages/Contacts";
import Templates from "./pages/Templates";
import Automation from "./pages/Automation";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/itsm" element={<ITSM />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}