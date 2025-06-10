import { useEffect, useState } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPieChart,
  FiArrowUp,
  FiArrowDown,
  FiAlertTriangle,
} from "react-icons/fi";
import Cookies from "js-cookie";
import axios from "axios";

export default function AssetMarketplace() {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cashFlowData, setCashFlowData] = useState([
    { month: "Jan", inflow: 15000, outflow: 8000 },
    { month: "Feb", inflow: 12000, outflow: 7500 },
    { month: "Mar", inflow: 18000, outflow: 9000 },
    { month: "Apr", inflow: 16000, outflow: 8500 },
  ]);

  useEffect(() => {
    const assetInfo = async () => {
      const token = Cookies.get("token");
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:4000/investor/asset",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPortfolio(response.data.data);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError("Failed to load portfolio data");
      } finally {
        setIsLoading(false);
      }
    };

    assetInfo();
  }, []);

  // Calculate portfolio metrics
  const totalRisk = portfolio.length > 0 ? portfolio[0].total_risk_sum : 0;
  const aum = portfolio[portfolio.length - 1];
  const riskPercentage =
    portfolio.length > 0 ? ((totalRisk / aum) * 100).toFixed(2) : 0;

  // Calculate cash flow metrics
  const totalInflow = cashFlowData.reduce(
    (sum, month) => sum + month.inflow,
    0
  );
  const totalOutflow = cashFlowData.reduce(
    (sum, month) => sum + month.outflow,
    0
  );
  const netCashFlow = totalInflow - totalOutflow;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 md:mt-[25px]">
      <h2 className="text-center text-lg md:text-xl font-bold mb-4 md:mb-6 text-slate-800">
        Emex Investment Dashboard
      </h2>

      {/* Glassmorphism Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* AUM Card */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Assets Under Management
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">${aum}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100/50">
              <FiDollarSign className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm text-slate-600">
            <FiTrendingUp className="text-emerald-500 mr-1" />
            <span>Total portfolio value</span>
          </div>
        </div>

        {/* Total Risk Card */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Risk Exposure
              </p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                $
                {totalRisk ? totalRisk.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }): 0}
              </h3>
            </div>
            <div className="p-3 rounded-full bg-amber-100/50">
              <FiAlertTriangle className="text-amber-600 text-xl" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm text-slate-600">
            <FiPieChart className="text-amber-500 mr-1" />
            <span>{totalRisk ? riskPercentage : 0}% of AUM</span>
          </div>
        </div>

        {/* Net Cash Flow Card */}
        <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Total Positions
              </p>
              <h3
                className={`text-2xl font-bold mt-1 ${
                  portfolio.length - 1 >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {portfolio.length - 1}
                {portfolio.length - 1 >= 0 ? " ↑" : " ↓"}
              </h3>
            </div>
            <div
              className={`p-3 rounded-full ${
                portfolio.length - 1 >= 0
                  ? "bg-emerald-100/50"
                  : "bg-red-100/50"
              }`}
            >
              {netCashFlow >= 0 ? (
                <FiArrowUp className="text-emerald-600 text-xl" />
              ) : (
                <FiArrowDown className="text-red-600 text-xl" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overall Fund Cashflow Visualization */}
      {/* <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Overall Fund Cashflow
        </h3>
        <div className="flex flex-col space-y-4">
          {(() => {
            // Calculate totals across all months
            const totalInflow = cashFlowData.reduce(
              (sum, month) => sum + month.inflow,
              0
            );
            const totalOutflow = cashFlowData.reduce(
              (sum, month) => sum + month.outflow,
              0
            );
            const total = totalInflow + totalOutflow;
            const inflowPercent = (totalInflow / total) * 100;
            const outflowPercent = (totalOutflow / total) * 100;
            const net = totalInflow - totalOutflow;

            return (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>All Time</span>
                  <span
                    className={`font-medium ${
                      net >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    Net: ${net.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex h-6 rounded-full overflow-hidden bg-slate-200/50">
                  <div
                    className="bg-emerald-500/80 flex items-center justify-end pr-2 text-xs text-white"
                    style={{ width: `${inflowPercent}%` }}
                  >
                    ${totalInflow.toLocaleString("en-US")}
                  </div>
                  <div
                    className="bg-red-500/80 flex items-center pl-2 text-xs text-white"
                    style={{ width: `${outflowPercent}%` }}
                  >
                    ${totalOutflow.toLocaleString("en-US")}
                  </div>
                </div>
              </div>
            );
          })()}
        </div> */}
      {/* </div> */}

      {/* Fund Breakdown Table */}
      <div className="lg:w-full overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-slate-500">
              Loading portfolio data...
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-lg text-red-600">{error}</div>
        ) : (
          <div className="min-w-full shadow ring-1 ring-black/5 rounded-lg overflow-x-scroll">
            <table className="min-w-full divide-y divide-slate-200/80">
              <thead className="bg-slate-50/80 backdrop-blur-sm">
                <tr>
                  {[
                    "Asset",
                    "Class",
                    "Allocation",
                    "Risk",
                    "Position",
                    "Price",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-slate-200/50">
                {portfolio.map((fund) => {
                  if (!fund.asset_id) return null;

                  const allocationPercent = (
                    (fund.risk / totalRisk) *
                    100
                  ).toFixed(2);

                  return (
                    <tr
                      key={fund.asset_id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base font-medium text-slate-800">
                        {fund.asset_name}
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-slate-600">
                        {fund.asset_class}
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-slate-200/50 rounded h-2.5">
                            <div
                              className="bg-amber-400/80 h-2.5 rounded"
                              style={{ width: `${allocationPercent}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-slate-600 text-sm md:text-base">
                            {allocationPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-slate-700">
                        $
                        {fund.risk.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base ${
                          fund.position === "long"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {fund.position}
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-slate-700">
                        $
                        {fund.unit_price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base ${
                          fund.is_active > 0
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }`}
                      >
                        {fund.is_active > 0 ? "↑ Open" : "↓ Closed"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
