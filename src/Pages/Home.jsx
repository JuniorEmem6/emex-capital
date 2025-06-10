import Header from "../components/Header";
import Hero from "../components/Hero"
import DataWaterfall from "../components/WaterFall";
import LiveMarketChart from "../components/Chart";
import InstitutionalTrust from "../components/Trust";
import Footer from "../components/Footer";
import InvestorDashboard from "./Dashboard";
import DashboardAdmin from "./InvestorAdmin";
import { useState } from "react";
import WealthSection from "../components/Wealth"
import Cookies from 'js-cookie'; // To read cookies


const App = () => {
  const [role, setRole] = useState("investor")
  const user = Cookies.get('token'); // Get token from cookie

  return (
    <>
     {
      !user ?  <div className="min-h-screen bg-slate-50">
      <Header />
      <Hero />
      <LiveMarketChart />
      <WealthSection />
      <DataWaterfall />
      <InstitutionalTrust />
      <Footer />
    </div> : role === "investor" ? <InvestorDashboard /> : <DashboardAdmin />
     }
    </>
  );
};

export default App;
