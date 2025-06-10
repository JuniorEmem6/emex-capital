import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import InvestorDashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import InvestorAdmin from "./Pages/InvestorAdmin";
import UnifiedAuth from "./Pages/AdminLogin";
import PitchbookRequest from "./components/Pitchbook";
import Cookies from "js-cookie"; // To read cookies

const App = () => {
  const user = Cookies.get("token"); // Get token from cookie

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!user ? <Register /> : <InvestorDashboard />} />
        <Route path="/login" element={!user ? <Login /> : <InvestorDashboard />}  />
        <Route path="/admin/login" element={<UnifiedAuth />} />
        <Route path="/pitchbook" element={<PitchbookRequest />} />
        <Route path="/dashboard" element={user ? <InvestorDashboard  /> : <Home />} />
        <Route path="/admin" element={<InvestorAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
