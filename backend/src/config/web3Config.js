const Web3 = require("web3");
const contractABI = require("../../build/contracts/LandRegistry.json");

const providerURL = "http://127.0.0.1:7545"; // Ganache URL
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

const contractAddress = "0xe2641730132a665357300AfC814404cf2E2F68F5";
const landRegistry = new web3.eth.Contract(contractABI.abi, contractAddress);

web3.eth.net
  .isListening()
  .then(() => console.log("🌐 Connected to Ganache"))
  .catch((err) => console.error("❌ Connection Error:", err));

web3.eth
  .getAccounts()
  .then((accounts) => console.log("🔹 Available Accounts:", accounts))
  .catch((err) => console.error("❌ Accounts Fetch Error:", err));

console.log("📜 Contract Methods:", landRegistry.methods);

module.exports = { web3, landRegistry };
