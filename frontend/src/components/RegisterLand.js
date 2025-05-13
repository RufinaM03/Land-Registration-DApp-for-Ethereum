import { useState } from "react";
import axios from "axios";
import { uploadToIPFS } from "../utils/pinataUpload"; // adjust path if your file is elsewhere

const RegisterLand = ({ account, identity }) => {
  const [formData, setFormData] = useState({
    propertyId: "",
    owner: account || "",
    details: "",
  });

  const [file, setFile] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const hash = await uploadToIPFS(file);
      setIpfsHash(hash);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Upload error", err);
      alert("Failed to upload file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert propertyId to BigInt for zk-SNARK computation
      const extNullifier = BigInt(formData.propertyId).toString();

      const proofResponse = await axios.post(
        "http://localhost:5000/api/generateProof",
        {
          identity: identity.toString(),
          externalNullifier: extNullifier,
        }
      );

      const { proofArray, nullifierHash } = proofResponse.data;

      const requestData = {
        propertyId: formData.propertyId,
        details: formData.details,
        nullifierHash: nullifierHash,
        proof: proofArray,
        owner: formData.owner,
      };

      console.log("Sending data to add-property API:", requestData); // ✅ Log request data

      const response = await axios.post(
        "http://localhost:5000/api/add-property",
        requestData
      );

      alert("Property added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add property!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-transparent shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Register New Land</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Property ID:</label>
          <input
            type="text"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Owner Address:</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-blue-100"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700">Details:</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="uploadCheckbox"
            checked={uploadEnabled}
            onChange={() => setUploadEnabled(!uploadEnabled)}
          />
          <label htmlFor="uploadCheckbox" className="text-gray-700">
            Attach Land Document (optional)
          </label>
        </div>

        {uploadEnabled && (
          <div className="space-y-2">
            <input type="file" onChange={handleFileChange} />
            <button
              type="button"
              onClick={handleUpload}
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Upload to IPFS
            </button>
            {ipfsHash && (
              <p className="text-green-600 text-sm">
                File uploaded! IPFS Hash:{" "}
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {ipfsHash}
                </a>
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
        >
          Register Land
        </button>
      </form>
    </div>
  );
};

export default RegisterLand;
