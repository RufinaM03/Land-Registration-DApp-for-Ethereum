// src/utils/pinataUpload.js
import axios from "axios";

const PINATA_API_KEY = "d52daf46cc57b65a1a92";
const PINATA_SECRET_API_KEY =
  "cb81a66f243690a5e9701ea270c48ec482e74cc549bfb26380ef56cda69e5342";

export const uploadToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(url, formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS via Pinata: ", error);
    throw error;
  }
};
