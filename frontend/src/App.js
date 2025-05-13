import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import RegisterUser from "./components/RegisterUser";
import RegisterLand from "./components/RegisterLand";
import SearchProperty from "./components/SearchProperty";
import LandList from "./components/LandList";
import connectWallet from "./connectWallet";
import WalletPage from "./components/WalletPage";
import EmailPage from "./components/EmailPage";
import BuyProperty from "./components/BuyProperty";
import IsForSaleLabel from "./components/IsForSaleLabel";
import SellProperty from "./components/SellProperty";
import SetPrice from "./components/SetPrice";
import Pay from "./components/Pay";
import bgImage from "./bg1.jpg";

const App = () => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [identityCommitment, setIdentityCommitment] = useState(""); // ✅ Store identity commitment
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentPage, setCurrentPage] = useState("app");
  const profileRef = useRef(null);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setAccount(wallet.account);
      checkUserRegistration(wallet.account);
    }
  };

  const checkUserRegistration = async (account) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/isUserRegistered/${account}`
      );
      if (response.data.isRegistered) {
        setIsRegistered(true);
        setUserName(response.data.name);
        setIdentityCommitment(response.data.identityCommitment); // ✅ Store identity commitment
      }
    } catch (error) {
      console.error("Error checking registration:", error);
    }
  };

  useEffect(() => {
    if (account) checkUserRegistration(account);
  }, [account]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (currentPage === "wallet")
    return (
      <WalletPage
        account={account}
        name={userName}
        goBack={() => setCurrentPage("app")}
      />
    );
  if (currentPage === "email")
    return <EmailPage goBack={() => setCurrentPage("app")} />;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen"
    >
      {isRegistered && (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-500">
            Land Registration DApp
          </h1>
          <div className="flex items-center space-x-6">
            <button
              className={`px-4 py-2 ${
                activeTab === "home"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "register"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("register")}
            >
              Register Land
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "search"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("search")}
            >
              Search Property
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "price"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("price")}
            >
              Set Price
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "forSale"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("forSale")}
            >
              For Sale
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "sell"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("sell")}
            >
              Sell Property
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "buy" ? "bg-blue-500 text-white" : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("buy")}
            >
              Buy Property
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "list"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              } rounded`}
              onClick={() => setActiveTab("list")}
            >
              Property List
            </button>

            <div className="relative" ref={profileRef}>
              <div
                className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer"
                onClick={() => setShowProfile(!showProfile)}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4 space-y-2 z-50">
                  <h3 className="text-lg font-semibold">{userName}</h3>
                  <button
                    className="w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                    onClick={() => setCurrentPage("wallet")}
                  >
                    Account Details
                  </button>
                  <button
                    className="w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                    onClick={() => setCurrentPage("email")}
                  >
                    Add Your Email
                  </button>
                  <button
                    className="w-full text-left text-red-600 hover:bg-red-100 p-2 rounded"
                    onClick={() => window.location.reload()}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      <div className="flex flex-col items-center p-6 space-y-6">
        {!account && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleConnect}
          >
            Connect with MetaMask
          </button>
        )}

        {account && !isRegistered && (
          <RegisterUser
            account={account}
            onRegister={(account, identityCommitment) => {
              checkUserRegistration(account);
              setIdentityCommitment(identityCommitment);
            }}
          />
        )}

        {isRegistered && (
          <div className="w-full space-y-6">
            {activeTab === "home" && (
              <div className="bg-transparent opacity-70 p-12 md:p-20 rounded-3xl shadow-2xl max-w-5xl mx-auto text-center backdrop-blur-md">
                <h2 className="text-4xl font-extrabold text-[#4192d5] drop-shadow mb-4">
                  Welcome, {userName}! 👋
                </h2>
                <p className="text-lg text-blue-700 mb-10 leading-relaxed">
                  You’re now connected to the{" "}
                  <span className="font-semibold text-blue">
                    Land Registration DApp
                  </span>
                  <br /> - an user interface to access our decentralized network
                  for property management.
                  <br />
                  Seamlessly manage your land assets — securely, transparently,
                  and effortlessly on the blockchain.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-6 bg-white rounded-2xl border border-[#c3e1f7] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-[#4192d5] mb-2">
                      🔍 Search Property
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Instantly locate land records using their unique property
                      ID.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-[#c3e1f7] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-[#4192d5] mb-2">
                      📄 Register Land
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Upload and verify your land ownership details onto the
                      chain.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-[#c3e1f7] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-[#4192d5] mb-2">
                      💸 Buy & Sell
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Explore properties, initiate secure purchases, and
                      finalize land sales.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "register" && (
              <RegisterLand account={account} identity={identityCommitment} />
            )}
            {activeTab === "search" && <SearchProperty />}
            {activeTab === "forSale" && <IsForSaleLabel />}
            {activeTab === "price" && <SetPrice from={account} />}
            {activeTab === "sell" && <SellProperty from={account} />}
            {activeTab === "buy" && <BuyProperty />}
            {activeTab === "list" && <LandList />}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
