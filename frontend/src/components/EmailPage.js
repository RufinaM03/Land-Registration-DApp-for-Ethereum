import React, { useState } from "react";

const EmailPage = ({ goBack }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = () => {
    setOtpSent(true);
    alert("OTP sent to your email!"); // Simulate OTP sending
  };

  const verifyOtp = () => {
    alert("Email verified successfully!");
    goBack();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        {otpSent ? "Verify OTP" : "Enter Your Email"}
      </h2>
      {!otpSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="px-3 py-2 border rounded w-64"
          />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="px-3 py-2 border rounded w-64"
          />
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={verifyOtp}
          >
            Verify
          </button>
        </>
      )}
      <button className="mt-4 text-blue-500" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export default EmailPage;
