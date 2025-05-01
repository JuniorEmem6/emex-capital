import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import InvestorDashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<InvestorDashboard />} />
        </Routes>
      </BrowserRouter>
  
  )
}

export default App
