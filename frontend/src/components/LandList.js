import React, { useEffect, useState } from "react";
import axios from "axios";

const LandList = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/land-list");
        setLands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLands();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="bg-transparent shadow-xl rounded-2xl overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-gray-800 py-6">
          📜 Registered Lands
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Property ID</th>
                <th className="py-3 px-6 text-left">Owner</th>
                <th className="py-3 px-6 text-left">Details</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">For Sale</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-medium">
              {lands.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No lands found 🌾
                  </td>
                </tr>
              ) : (
                lands.map((land, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-3 px-6">{land.propertyId}</td>
                    <td className="py-3 px-6">{land.owner}</td>
                    <td className="py-3 px-6">{land.details}</td>
                    <td className="py-3 px-6">{land.price}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          land.isForSale
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {land.isForSale ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandList;
