import React, { useState } from "react";
import axios from "axios";

const SellProperty = ({ from }) => {
  const [formData, setFormData] = useState({
    propertyId: "",
    price: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSell = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/sell-property",
        {
          propertyId: formData.propertyId,
          price: formData.price,
          from: from,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(
        response.data.success
          ? "✅ Property marked for sale!"
          : "❌ " + response.data.error
      );
    } catch (error) {
      if (error.response) {
        setMessage("❌ " + error.response.data.error);
      } else {
        setMessage("❌ " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-transparent rounded-xl shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-[#4192d5]">Sell Property</h2>
      <input
        type="number"
        name="propertyId"
        placeholder="Property ID"
        value={formData.propertyId}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />
      <button
        onClick={handleSell}
        disabled={loading}
        className={`bg-black text-white px-4 py-2 w-full rounded hover:bg-blue-600 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Processing..." : "Sell"}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SellProperty;
