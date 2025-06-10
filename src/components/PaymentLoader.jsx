import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentLoader = ({ profit }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // setIsComplete(false);

    const token = Cookies.get("token");
    setProgress(50);

    axios
      .get(`http://localhost:4000/pay/investor/redeem?amount=${profit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setProgress(100);
          setIsComplete(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fully transparent backdrop with just blur */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-80 p-6 rounded-2xl border border-white border-opacity-20 shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Content */}
          <div className="flex flex-col items-center">
            {/* Animated icon */}
            {!isComplete ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-16 h-16 mb-4 rounded-full border-4 border-t-indigo-400 border-r-pink-400 border-b-purple-400 border-l-blue-400 border-opacity-80"
              />
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            )}

            {/* Status text */}
            <h3 className="text-xl font-semibold text-slate-700 mb-1 text-center">
              {!isComplete ? "Processing Payment" : "Payment Sent!"}
            </h3>

            <p className="text-slate-700 text-opacity-70 text-sm mb-4 text-center">
              {!isComplete
                ? "Transferring to client account"
                : "Funds have been successfully transferred"}
            </p>

            {/* Progress indicator */}
            <div className="w-full">
              {!isComplete ? (
                <>
                  <div className="w-full h-1.5 bg-white bg-opacity-20 rounded-full overflow-hidden mb-1">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white text-opacity-80 font-mono">
                      {Math.min(progress, 100).toFixed(0)}%
                    </span>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-green-300 mt-2"
                >
                  Transaction completed successfully
                </motion.div>
              )}
            </div>
          </div>

          {/* Subtle floating particles */}
          {isComplete && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: [
                      "#f72585",
                      "#b5179e",
                      "#7209b7",
                      "#4361ee",
                      "#4895ef",
                      "#4cc9f0",
                    ][Math.floor(Math.random() * 6)],
                    top: `${Math.random() * 60 + 20}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    y: 0,
                    x: 0,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.3],
                    y: [0, (Math.random() - 0.5) * 40],
                    x: [0, (Math.random() - 0.5) * 30],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PaymentLoader;
