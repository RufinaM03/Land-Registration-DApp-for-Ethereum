// Example in UploadComponent.js
import React, { useState } from "react";
import { uploadToIPFS } from "../utils/pinataUpload";

function UploadComponent() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const hash = await uploadToIPFS(file);
      setIpfsHash(hash);
    } catch (err) {
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleUpload}
      >
        Upload to IPFS
      </button>
      {ipfsHash && (
        <p className="mt-2 text-green-600">
          Uploaded! IPFS Hash:{" "}
          <a
            href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ipfsHash}
          </a>
        </p>
      )}
    </div>
  );
}

export default UploadComponent;
