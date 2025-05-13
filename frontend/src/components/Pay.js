import React, { useState } from "react";
import Web3 from "web3";

const Pay = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handlePayment = async () => {
    if (!window.ethereum) {
      return alert("Please install MetaMask!");
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

      const tx = {
        from,
        to: toAddress,
        value: web3.utils.toWei(amount, "ether"),
      };

      await web3.eth.sendTransaction(tx);
      setStatus("✅ Payment Successful!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-[#4192d5]">Pay via MetaMask</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handlePayment}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-blue-600"
      >
        Pay Now
      </button>
      <p>{status}</p>
    </div>
  );
};

export default Pay;
