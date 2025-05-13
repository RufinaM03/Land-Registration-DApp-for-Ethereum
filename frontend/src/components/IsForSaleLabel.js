import React, { useState } from "react";

const IsForSaleLabel = () => {
  const [propertyId, setPropertyId] = useState("");
  const [label, setLabel] = useState("");

  const checkSaleStatus = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/is-for-sale/${propertyId}`
      );
      const data = await res.json();
      setLabel(data.isForSale ? "🟢 Property is FOR SALE" : "🔴 Not for sale");
    } catch (err) {
      setLabel("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-4 bg-transparent rounded-xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-[#4192d5]">Check Sale Status</h2>
      <input
        type="number"
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={checkSaleStatus}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-blue-600"
      >
        Check
      </button>
      <p>{label}</p>
    </div>
  );
};

export default IsForSaleLabel;
