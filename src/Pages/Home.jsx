import Header from "../components/Header";
import Hero from "../components/Hero"
import HeroWithFinanceBG from "../components/HeroBg";
import DataWaterfall from "../components/WaterFall";
import LiveMarketChart from "../components/Chart";
import InstitutionalTrust from "../components/Trust";
import Footer from "../components/Footer";
import InvestorDashboard from "./Dashboard";
import Login from "./Login";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <HeroWithFinanceBG />
        <Hero />
        <LiveMarketChart />
        <DataWaterfall />
        <InstitutionalTrust />
        <Footer />
      </div>
      {/* <InvestorDashboard /> */}
      {/* <Login /> */}
    </>
  );
};

export default App;
