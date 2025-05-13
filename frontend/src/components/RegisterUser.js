import React, { useState } from "react";
import axios from "axios";

const RegisterUser = ({ account, onRegister }) => {
  const [name, setName] = useState("");
  const [identityCommitment, setIdentityCommitment] = useState(""); // ✅ Store identity commitment

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        account,
      });

      const { identityCommitment } = response.data;
      setIdentityCommitment(identityCommitment); // ✅ Update state with identity commitment

      alert("User registered successfully!");
      onRegister(account); // Refresh registration status
    } catch (error) {
      console.error(error);
      alert("Failed to register user!");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-transparent shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Account Address:</label>
          <input
            type="text"
            value={account}
            className="w-full px-3 py-2 border rounded bg-blue-100"
            readOnly
          />
        </div>

        {identityCommitment && (
          <div>
            <label className="block text-gray-700">Identity Commitment:</label>
            <input
              type="text"
              value={identityCommitment}
              className="w-full px-3 py-2 border rounded bg-blue-100"
              readOnly
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
