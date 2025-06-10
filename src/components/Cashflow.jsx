import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Cashflow = ({
  netCashFlowSetter,
  netCashInFlowSetter,
  netCashOutFlowSetter,
}) => {
  const [cashFlowData, setCashFlowData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assetInfo = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          "http://localhost:4000/investor/cashflow",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCashFlowData(response.data.data);
        setLoading(false);
        netCashFlowSetter(cashFlowData.totalInflow - cashFlowData.totalOutflow);
        netCashInFlowSetter(cashFlowData.totalInflow);
        netCashOutFlowSetter(cashFlowData.totalOutflow);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setError("Failed to load portfolio data");
      }
    };

    assetInfo();
  }, []);

  let outflowPercent;
  let inflowPercent;
  let netCashFlow;
  let total;
  let totalInflow;
  let totalOutflow;

  if (!loading) {
    // Calculate cash flow metrics
    const totalInflow = cashFlowData.totalInflow;
    console.log(cashFlowData);
    const totalOutflow = cashFlowData.totalOutflow;
    total = totalInflow + totalOutflow;
    inflowPercent = (totalInflow / total) * 100;
    outflowPercent = (totalOutflow / total) * 100;
    netCashFlow = totalInflow - totalOutflow;
  }

  return (
    <>
      {/* Overall Fund Cashflow Visualization */}
      <div className="bg-white/50 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Overall Fund Cashflow
        </h3>
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-600">
              <span>All Time</span>
              <span
                className={`font-medium ${
                  netCashFlow >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                Net: ${netCashFlow}
              </span>
            </div>
            <div className="flex h-6 rounded-full overflow-hidden bg-slate-200/50">
              <div
                className="bg-emerald-500/80 flex items-center justify-end pr-2 text-xs text-white"
                style={{ width: `${inflowPercent}%` }}
              >
                ${totalInflow}
              </div>
              <div
                className="bg-red-500/80 flex items-center pl-2 text-xs text-white"
                style={{ width: `${outflowPercent}%` }}
              >
                ${totalOutflow}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cashflow;
