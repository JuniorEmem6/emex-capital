import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InvestorProfile = ({ profile }) => {
  const SECRET_KEY = "pk_test_gg8xknA8BDDKkmP3EcL5aHCAUzaoiHca3yPvH4o3";
  const navigate = useNavigate();
  const [newProfile, setNewProfile] = useState(profile);

  // Bank accounts state
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    bankCode: "",
  });

  const [banks, setBanks] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Avoid refetching on every click

  const fetchBanks = async () => {
    if (hasFetched) return; // Only fetch once

    try {
      const response = await axios.get(
        "https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG",
        {
          headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
          },
        }
      );
      setBanks(response.data.data);
      setHasFetched(true);
    } catch (error) {
      console.error("Error fetching banks:", error.message);
      throw new Error("Failed to fetch banks");
    }
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  // Form errors
  const [errors, setErrors] = useState({});

  // Loading bank account data
  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("token");
      axios
        .get("http://localhost:4000/service/bank", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAccounts(response.data.data);
        })
        .catch((error) => console.error(error));
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const validateAccount = () => {
    const newErrors = {};
    if (!newAccount.accountNumber)
      newErrors.accountNumber = "Account number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = () => {
    // In a real app, you would save to backend
    const token = Cookies.get("token");
    axios
      .put("http://localhost:4000/investor", newProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setIsEditing(false);
          navigate(0);
        }
      })
      .catch((error) => console.error(error));
  };

  const addAccount = () => {
    if (!validateAccount()) return;

    const token = Cookies.get("token");

    axios
      .post("http://localhost:4000/service/bank", newAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate(0); // reloads the current route
        }
      })
      .catch((error) => setErrors(error.response.data.message));

    setIsAddingAccount(false);
    setNewAccount({
      bankName: "",
      accountName: "",
      accountNumber: "",
      accountType: "saving",
    });
  };

  const setAsDefault = (id) => {
    const token = Cookies.get("token");

    axios
      .get(`http://localhost:4000/service/bank/default?accountId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(0);
        }
      })
      .catch((error) => console.error(error));
  };

  const deleteAccount = (id) => {
    if (accounts.length <= 1) {
      alert("You must have at least one bank account");
      return;
    }

    const token = Cookies.get("token");
    axios
      .delete(`http://localhost:4000/service/bank?accountId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate(0);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow overflow-hidden rounded-lg"
        >
          {/* Profile Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-indigo-700 text-white">
            <h2 className="text-2xl font-bold">Investor Profile</h2>
            <p className="mt-1">
              Manage your personal information and bank accounts
            </p>
          </div>

          {/* Investment Preferences Section */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 mt-[15px]">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Profit Distribution Settings
            </h3>

            {/* Distribution Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How should your profits be handled?
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    profile.distribution === "auto"
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        profile.distribution === "auto"
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300"
                      }`}
                    >
                      {profile.istribution === "auto" && (
                        <svg
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Automatic Distribution
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Profits are automatically sent to your bank account each
                        period
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    profile.distribution === "manual"
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        profile.distribution === "manual"
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300"
                      }`}
                    >
                      {profile.distribution === "manual" && (
                        <svg
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Manual Distribution
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Profits accumulate until you request disbursement
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Investment Preferences Section - NEW */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 mt-[15px]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Reinvestment Preferences{" "}
                  <span
                    className={`${
                      newProfile.compound === "active"
                        ? "bg-teal-400"
                        : "bg-slate-600"
                    } ${
                      newProfile.compound === "active" ? "" : "text-slate-200"
                    } rounded-lg text-[12px] p-[4px] text-center`}
                  >
                    {newProfile.compound}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {profile.compound
                    ? "Profits are automatically reinvested"
                    : "Profits accumulate until you request disbursement"}
                </p>
              </div>
              <button
                type="button"
                disabled
                className={`${
                  newProfile.compound === "active"
                    ? "bg-indigo-600"
                    : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Enable automatic compounding</span>
                <span
                  className={`${
                    profile.compound === "active"
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {profile.compound === "active" ? (
                <p>
                  <span className="font-medium">Compounding enabled:</span> Your
                  profits will be automatically added to your investment capital
                  for growth.
                </p>
              ) : (
                <p>
                  <span className="font-medium">Compounding disabled:</span>{" "}
                  Your profits will accumulate until you request disbursement.
                </p>
              )}
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-6 py-6 mt-[15px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>
              {isEditing ? (
                <div className="space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProfile}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {Object.entries(newProfile).map(([key, value]) =>
                  value !== "active" || key !== "status" ? (
                    <div key={key}>
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        // id={key}
                        name={key}
                        value={value}
                        readOnly={!isEditing}
                        onChange={handleProfileChange}
                        onClick={() => setIsEditing(true)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key} className="sm:col-span-1">
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    <p className="mt-1 text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bank Accounts Section */}
          <div className="px-6 py-6 border-t border-gray-200 mt-[15px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Bank Accounts
              </h3>
              <button
                onClick={() => setIsAddingAccount(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Add Bank Account
              </button>
            </div>

            <AnimatePresence>
              {isAddingAccount && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Add New Bank Account
                  </h4>
                  <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bank" className="block mb-1">
                        Select Your Bank:
                      </label>
                      <select
                        id="bank"
                        name="bankName"
                        value={newAccount.bankName}
                        onChange={handleBankChange}
                        onFocus={fetchBanks} // triggers the POST request when clicked
                        className="block w-full border px-3 py-2 rounded"
                      >
                        <option value="">-- Choose a bank --</option>
                        {banks.map((bank, index) => (
                          <option key={index} value={bank.name}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="accountName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        id="accountName"
                        name="accountName"
                        value={profile.full_name}
                        onChange={handleAccountChange}
                        className={`mt-1 block w-full border ${
                          errors.accountName
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      
                    </div>

                    <div>
                      <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account Number
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={newAccount.accountNumber}
                        onChange={handleAccountChange}
                        className={`mt-1 block w-full border ${
                          errors.accountNumber
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.accountNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.accountNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="accountType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Account Type
                      </label>
                      <select
                        id="accountType"
                        name="accountType"
                        value={newAccount.accountType}
                        onChange={handleAccountChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="savings">Savings</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setIsAddingAccount(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addAccount}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Add Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {accounts.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No bank accounts
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add a bank account to receive transfers
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {accounts.map((account) => (
                  <motion.li
                    key={account.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            account.isDefault ? "bg-indigo-100" : "bg-gray-100"
                          }`}
                        >
                          <svg
                            className={`h-6 w-6 ${
                              account.isDefault
                                ? "text-indigo-600"
                                : "text-gray-400"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {account.bank_name} •{" "}
                            {account.account_type.charAt(0).toUpperCase() +
                              account.account_type.slice(1)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {account.account_name} • {account.account_number}
                          </p>
                          {account.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!account.isDefault && (
                          <button
                            onClick={() => setAsDefault(account.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAccount(account.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorProfile;
