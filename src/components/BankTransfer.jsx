import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const BankTransferCheckout = ({ storedUser, amount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [hasExpired, setHasExpired] = useState(false);
  const token = Cookies.get("token");

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setHasExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 mt-[40px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Bank Transfer
              </h2>
              <p className="mt-2 text-gray-600">
                Please transfer to the account below
              </p>

              {/* Countdown Timer */}
              <div
                className={`mt-4 py-2 px-4 rounded-full inline-flex items-center ${
                  hasExpired
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">
                  {hasExpired
                    ? "Payment Expired"
                    : `Expires in ${formatTime(timeLeft)}`}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {hasExpired ? (
                  <div className="bg-red-50 p-5 rounded-lg border border-red-200 text-center">
                    <h3 className="text-lg font-medium text-red-800 mb-2">
                      Payment Window Expired
                    </h3>
                    <p className="text-red-600">
                      Please restart your order to get new payment details.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
                    >
                      Restart Payment
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Bank Details Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-blue-50 p-5 rounded-lg border border-blue-100"
                    >
                      <div className="space-y-4">
                        <DetailItem
                          label="Bank Name"
                          value={storedUser.bank_name}
                          onCopy={() =>
                            copyToClipboard(storedUser.bank_name, "bankName")
                          }
                          copied={copiedField === "bankName"}
                        />

                        <DetailItem
                          label="Account Name"
                          value={storedUser.account_name}
                          onCopy={() =>
                            copyToClipboard(
                              storedUser.account_name,
                              "accountName"
                            )
                          }
                          copied={copiedField === "accountName"}
                        />

                        <DetailItem
                          label="Account Number"
                          value={storedUser.account_number}
                          onCopy={() =>
                            copyToClipboard(
                              storedUser.account_mumber,
                              "accountNumber"
                            )
                          }
                          copied={copiedField === "accountNumber"}
                        />

                        <DetailItem
                          label="Amount (NGN)"
                          value={"NGN" + " " + amount}
                          onCopy={() => copyToClipboard(amount, "amount")}
                          copied={copiedField === "amount"}
                        />
                      </div>
                    </motion.div>

                    {/* Instructions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800"
                    >
                      <p className="font-medium">Important:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Complete payment within {formatTime(timeLeft)}</li>
                      </ul>
                    </motion.div>

                    {/* Confirmation Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Link to={token ? "/" : "/login"}>
                        <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                          I've Completed the Transfer
                        </button>
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Reusable detail component
const DetailItem = ({ label, value, onCopy, copied }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <div className="flex items-center mt-1">
      <p className="text-lg font-semibold text-gray-800 flex-grow">{value}</p>
      <button
        onClick={onCopy}
        className="ml-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label={`Copy ${label}`}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-green-500"
            >
              ✓
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-gray-400 hover:text-gray-600"
            >
              ⎘
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  </div>
);

export default BankTransferCheckout;
