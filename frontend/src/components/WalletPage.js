import React from "react";

const WalletPage = ({ account, name, goBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full sm:w-3/4 lg:w-1/2 ">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">
          Your Account Details
        </h2>

        <div className="mb-4 whitespace-nowrap">
          <p className="text-gray-600 font-semibold">Name:</p>
          <p className="text-lg text-gray-800">{name}</p>
        </div>

        <div className="mb-4 whitespace-nowrap">
          <p className="text-gray-600 font-semibold">Account Address:</p>
          <p className="break-words bg-blue-100 p-3 rounded-md text-sm text-gray-700">
            {account}
          </p>
        </div>

        <button
          className="mt-6 px-5 py-2 w-8 bg-blue text-black rounded-lg hover:blue transition duration-300 whitespace-nowrap"
          onClick={goBack}
        >
          ⬅Back
        </button>
      </div>
    </div>
  );
};

export default WalletPage;
