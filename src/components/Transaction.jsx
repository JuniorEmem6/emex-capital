import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const TransactionHistory = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const dashboardTransaction = async () => {
      const token = Cookies.get("token");
      axios
        .get("http://localhost:4000/pay/investor/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTransactionHistory(response.data.data);
        })
        .catch((error) => console.error(error));
    };

    dashboardTransaction();
  }, []);

  return (
    <>
      <div className="mt-6 sm:mt-8">
        <h3 className="font-medium mb-3 sm:mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {transactionHistory.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                    {txn.created_at}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm capitalize">
                    {txn.type}
                  </td>
                  <td
                    className={`px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm ${
                      txn.status === "success"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {txn.type == "subscription" || txn.type == "reinvested" ? "+": "-"}
                    ${txn.amount.toLocaleString()}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        txn.status === "success"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
