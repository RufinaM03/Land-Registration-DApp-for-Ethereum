import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import contractJSON from "../LandRegistry.json";
const contractABI = contractJSON.abi;

const contractAddress = "0xe2641730132a665357300AfC814404cf2E2F68F5";
const BuyProperty = () => {
  const [propertyId, setPropertyId] = useState("");
  const [priceInEth, setPriceInEth] = useState("");
  const [status, setStatus] = useState("");

  const handleBuy = async () => {
    if (!window.ethereum) {
      return alert("Please install MetaMask to proceed!");
    }

    const userConfirmed = window.confirm(
      `You're about to buy this property for ${priceInEth} ETH. Do you want to continue?`
    );

    if (!userConfirmed) {
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const from = accounts[0];

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      const valueInWei = web3.utils.toWei(priceInEth, "ether");

      await contract.methods.buyProperty(propertyId).send({
        from,
        value: valueInWei,
      });

      setStatus("✅ Property bought successfully!");
      console.log("Transaction successful");
    } catch (err) {
      console.error("Buy Error:", err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-transparent shadow rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-center">Buy Property</h2>
      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Price in ETH"
        value={priceInEth}
        onChange={(e) => setPriceInEth(e.target.value)}
      />
      <button
        onClick={handleBuy}
        className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Buy Now
      </button>
      <p className="text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default BuyProperty;
