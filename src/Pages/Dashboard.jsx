import { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import {
  ArrowTrendingUpIcon as ArrowTrendingUp,
  BanknotesIcon as Banknotes,
  WalletIcon as Wallet,
  ChartBarSquareIcon as ChartBarSquare,
  UserIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/outline";
import PortfolioTab from "../components/LeverageTrade";
import AssetMarketplace from "../components/AssetTab";
import Cookies from "js-cookie";
import axios from "axios";
import PerformanceChart from "../components/PerformanceChart";
import InvestorProfile from "../components/InvestorProfile";
import InvestmentPlatform from "../components/PrivateCall";
import TransactionHistory from "../components/Transaction";

export default function InvestorDashboard() {
  const [investor, setInvestor] = useState({});
  const [activeTab, setActiveTab] = useState("portfolio");

  useEffect(() => {
    const dashboardInfo = async () => {
      const token = Cookies.get("token");
      axios
        .get("http://localhost:4000/investor/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setInvestor(response.data.data);
        })
        .catch((error) => console.error(error));
    };

    dashboardInfo();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-slate-900 text-white p-4 sm:p-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
            <span className="text-amber-400">EMEX</span> INVESTOR PORTAL
          </h1>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-normal">
            <div className="text-left">
              <p className="text-slate-400 text-sm sm:text-[17px] truncate max-w-[180px] sm:max-w-none">
                Welcome {investor.full_name || "Investor"}
              </p>
            </div>
            <button
              onClick={() => {
                Cookies.remove("token");
                window.location.reload();
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto p-4 sm:p-6">
        <TabGroup>
          <TabList className="flex overflow-x-auto space-x-1 rounded-xl bg-slate-200 p-1 mb-6 sm:mb-8">
            {[
              { name: "Portfolio", icon: ChartBarSquare },
              { name: "Investment", icon: Banknotes },
              { name: "Performance", icon: ArrowTrendingUp },
              { name: "Private Call", icon: PhoneArrowDownLeftIcon },
              { name: "Profile", icon: UserIcon },
            ].map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `flex items-center space-x-2 rounded-lg py-2 px-3 sm:py-3 sm:px-4 text-xs sm:text-sm font-medium leading-5 whitespace-nowrap ${
                    selected
                      ? "bg-white text-amber-600 shadow"
                      : "text-slate-600 hover:bg-white/[0.12] hover:text-slate-800"
                  }`
                }
              >
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-2 sm:mt-4">
            {/* Portfolio Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-4 sm:p-6 mt-4 sm:mt-[25px]">
              <PortfolioTab investor={investor} />
            </TabPanel>

            {/* Investment Tab */}
            <TabPanel>
              {investor.status === "active" ? (
                <AssetMarketplace />
              ) : (
                <PortfolioTab investor={investor} type={investor.status} />
              )}
            </TabPanel>

            {/* Performance Tab */}
            <TabPanel className="bg-white rounded-xl shadow p-4 sm:p-6">
              <PerformanceChart />
              <TransactionHistory />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl shadow p-4 sm:p-6">
              <InvestmentPlatform />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl shadow p-4 sm:p-6">
              <InvestorProfile
                profile={{
                  full_name: investor.full_name,
                  phone_number: investor.phone_number,
                  email: investor.email,
                  status: investor.status,
                  compound: investor.compound,
                  distribution: investor.distribution,
                }}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>

      {/* Dashboard Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500 text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} Emex Capital LLC. All investments
            involve risk.
          </p>
          <p className="mt-1 sm:mt-2">
            For assistance, contact{" "}
            <a
              href="mailto:support@emexcapital.com"
              className="text-amber-600 hover:underline"
            >
              support@emexcapital.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
