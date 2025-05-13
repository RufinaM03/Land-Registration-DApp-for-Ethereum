import React, { useState } from "react";
import axios from "axios";

const SetPrice = ({ from }) => {
  const [propertyId, setPropertyId] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSetPrice = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/set-price", {
        propertyId,
        price,
        from,
      });

      const data = response.data;
      if (data.success) {
        setMessage("✅ Price updated successfully!");
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="p-4 bg-transparent rounded-xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-[#4192d5]">Set Property Price</h2>
      <input
        type="number"
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Price (in Wei)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleSetPrice}
        className="bg-black text-white px-4 py-2 w-full rounded hover:bg-blue-600"
      >
        Set Price
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SetPrice;
