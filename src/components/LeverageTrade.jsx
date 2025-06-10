// src/components/dashboard/PortfolioTab.jsx
import { useState } from "react";
import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import BankTransferCheckout from "./BankTransfer";
import PaymentLoader from "./PaymentLoader";

export default function PortfolioTab({ investor, type }) {
  const [activeCapitalTab, setActiveCapitalTab] = useState("request");
  const [amount, setAmount] = useState(100);
  const [request, setRequest] = useState(0);
  const [bankDetails, setBankDetails] = useState({});
  const [transfer, setTransfer] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [reference, setReference] = useState("");
  const [amountError, setAmountError] = useState({});
  const [profit, setProfit] = useState(0);
  const [paymentLoader, setPaymentLoader] = useState(false);

  const date = new Date();

  const validate = () => {
    const newErrors = {};

    if (request > investor.capital || request === 0.0)
      newErrors.request = "Amount greater than capital and 0";

    if (profit > investor.profit || profit === 0.0)
      newErrors.profit = "Amount greater than profit and 0";

    if (amount < 100) newErrors.subscribe = "Minimun deposit $100";

    return newErrors;
  };

  const handleRequestCapital = () => {
    const token = Cookies.get("token");

    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setAmountError(validationErrors);
    //   return;
    // }

    axios
      .get(`http://localhost:4000/pay/investor/request?amount=${request}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setRequest(response.data.amount);
          setReference(response.data.reference);

          setRequestModal(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddCapital = () => {
    const token = Cookies.get("token");

    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setAmountError(validationErrors);
    //   return;
    // }

    axios
      .get(`http://localhost:4000/pay/investor/subscribe?amount=${amount}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBankDetails(response.data.data);
        setTransfer(true);
      })
      .catch((error) => console.log(error));
  };

  const handleWithdrawProfit = () => {
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setAmountError(validationErrors);
    //   return;
    // }

    setPaymentLoader(true);
  };

  return (
    <div className="space-y-8 mt-[55px]">
      {/* Leverage Trading Section */}
      {transfer ? (
        <BankTransferCheckout
          storedUser={bankDetails.bank_account}
          amount={bankDetails.amount}
        />
      ) : (
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-[20px] font-bold mb-6 ml-[27px]">
            {type ? "Subscribe to access fund" : "Your Portfolio"}
          </h1>
          {!type ? <GlassCapitalMetrics investor={investor} /> : ""}

          {/* Capital Management */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-lg font-medium mb-4">Capital Management</h4>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveCapitalTab("request")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCapitalTab === "request"
                    ? "border-b-2 border-amber-500 text-amber-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Request Capital
              </button>
              <button
                onClick={() => setActiveCapitalTab("add")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCapitalTab === "add"
                    ? "border-b-2 border-amber-500 text-amber-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Add Capital
              </button>
              <button
                onClick={() => setActiveCapitalTab("withdraw")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCapitalTab === "withdraw"
                    ? "border-b-2 border-amber-500 text-amber-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Withdraw Profit
              </button>
            </div>

            {/* Add Capital Tab */}
            {activeCapitalTab === "add" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Amount to Add
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm DO">$</span>
                    </div>
                    <input
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                      className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                      placeholder={`${amount}.00`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-slate-500 sm:text-sm pr-3">
                        USD
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Payment method
                  </label>
                  <select className="block w-full py-3 border-slate-300 rounded-md">
                    <option>Bank Transfer</option>
                  </select>
                </div>
                {amountError.subscribe && (
                  <p className="mt-1 text-sm text-rose-600">
                    {amountError.subscribe}
                  </p>
                )}
                <button
                  onClick={() => handleAddCapital()}
                  className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-md"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Add to Margin Account
                </button>

                <p className="text-xs text-slate-500 mt-2">
                  Funds typically available within 1 business day
                </p>
              </div>
            )}

            {paymentLoader && <PaymentLoader profit={profit} />}

            <AnimatePresence>
              {requestModal && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="fixed inset-0 flex items-center justify-center p-4 z-50"
                >
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 backdrop-blur-sm"
                    onClick={() => setRequestModal(false)}
                  />

                  {/* Modal Content */}
                  <motion.div className="relative w-full max-w-md bg-linear-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
                    {/* Header */}
                    <div className="bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Capital Request</h2>
                        <button
                          onClick={() => setRequestModal(false)}
                          className="text-white hover:text-indigo-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 animate-pulse mr-2"></span>
                        <span className="text-indigo-100 font-medium">
                          Under Review
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Request ID:</span>
                          <span className="font-medium">{reference}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-bold text-indigo-700">
                            ${request}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium">R&D</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Submitted:</span>
                          <span className="font-medium">
                            {date.getUTCDate()}
                            <sup>th</sup>{" "}
                            {date.toLocaleString("default", { month: "long" })},{" "}
                            {date.getFullYear()}
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-blue-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              Your request is currently being reviewed by the
                              finance team. You'll receive a notification once a
                              decision is made.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
                      <button
                        onClick={() => setRequestModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Request Capital Tab */}
            {activeCapitalTab === "request" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Available Capital
                  </label>
                  <p className="text-2xl font-mono text-emerald-600">
                    ${investor.capital}.00
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Amount Requested
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      onChange={(e) => setRequest(e.target.value)}
                      className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                      placeholder={`${request}.00`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-slate-500 sm:text-sm pr-3">
                        USD
                      </span>
                    </div>
                  </div>
                </div>

                {amountError.request && (
                  <p className="mt-1 text-sm text-rose-600">
                    {amountError.request}
                  </p>
                )}

                <button
                  onClick={() => handleRequestCapital()}
                  className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-md"
                >
                  <BanknotesIcon className="h-5 w-5 mr-2" />
                  Submit Capital Request
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Typical approval time: 30 business days.
                </p>
              </div>
            )}

            {/* Withdraw Profit Tab */}
            {activeCapitalTab === "withdraw" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Available Profit
                  </label>
                  <p className="text-2xl font-mono text-emerald-600">
                    ${investor.profit}.00
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Withdrawal Amount
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      onChange={(e) => setProfit(e.target.value)}
                      className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-7 pr-12 py-3 border-slate-300 rounded-md"
                      placeholder="0.00"
                      max="50000"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <span className="text-slate-500 sm:text-sm pr-3">
                        USD
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Destination
                  </label>
                  <select className="block w-full py-3 border-slate-300 rounded-md">
                    <option>Default Bank Account</option>
                  </select>
                </div>
                {amountError.profit && (
                  <p className="mt-1 text-sm text-rose-600">
                    {amountError.profit}
                  </p>
                )}
                <button
                  onClick={() => handleWithdrawProfit()}
                  className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Request Profit Withdrawal
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Processing time: 3-5 business days. $25 fee for expedited
                  transfers.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// src/components/GlassCapitalMetrics.jsx
const GlassCapitalMetrics = ({ investor }) => {
  const metrics = [
    {
      title: "Total Capital",
      value: `$${investor.capital}.00`,

      isPositive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Equity",
      value: `$${investor.capital + investor.profit}.00`,

      isPositive: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Interest Rate",
      value: `${investor.interest_rate}%`,
      isPositive: null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
          />
        </svg>
      ),
    },
    {
      title: "ROI",
      value: `$${investor.profit}.00`,
      isPositive: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metrics.map((metric, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            key={index}
            className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            }}
          >
            {/* Floating bubbles */}
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-amber-400/10"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-black/80">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-black mt-2">
                    {metric.value}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    metric.isPositive === null
                      ? "bg-slate-500/20"
                      : metric.isPositive
                      ? "bg-emerald-500/20"
                      : "bg-rose-500/20"
                  }`}
                >
                  {metric.icon}
                </div>
              </div>

              <div
                className={`mt-4 inline-flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                  metric.isPositive === null
                    ? "bg-slate-500/20 text-slate-700"
                    : metric.isPositive
                    ? "bg-emerald-500/20 text-slate-700"
                    : "bg-rose-500/20 text-rose-200"
                }`}
              >
                {metric.change}
                {metric.isPositive !== null && (
                  <svg
                    className={`ml-1 h-4 w-4 ${
                      metric.isPositive ? "text-emerald-300" : "text-rose-300"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={metric.isPositive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
