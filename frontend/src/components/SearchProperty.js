import React, { useState } from "react";
import axios from "axios";

const SearchProperty = () => {
  const [propertyId, setPropertyId] = useState("");
  const [property, setProperty] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search-property/${propertyId}`
      );
      setProperty(response.data);
    } catch (error) {
      console.error(error);
      alert("Property not found!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-transparent shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Property</h2>
      <input
        type="text"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        placeholder="Enter Property ID"
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {property && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Property Details:</h3>
          <p>
            <strong>Owner:</strong> {property[1]}
          </p>
          <p>
            <strong>Details:</strong> {property[2]}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchProperty;
