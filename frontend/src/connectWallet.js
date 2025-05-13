import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const connectWallet = async () => {
  try {
    // 🔍 Detect MetaMask provider
    const provider = await detectEthereumProvider();
    if (!provider) {
      alert("MetaMask not detected. Please install MetaMask!");
      return null;
    }

    console.log("🦊 MetaMask detected!");
    const web3 = new Web3(provider);

    // 🔄 Request accounts (MetaMask will prompt the user to choose an account)
    const accounts = await provider.request({ method: "eth_requestAccounts" });

    if (accounts.length === 0) {
      alert("No accounts found. Please connect an account in MetaMask.");
      return null;
    }

    const selectedAccount = accounts[0]; // User-selected account
    console.log("🔹 Connected Account:", selectedAccount);

    // 🌐 Check Network ID (Ganache usually uses ID 1337 or 5777)
    const networkId = await web3.eth.net.getId();
    console.log("🌐 Network ID:", networkId);

    // 🛠 Force switch to Ganache if not connected
    if (networkId !== 1337 && networkId !== 5777) {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x539" }], // 0x539 = 1337 in hex (Ganache's default chain ID)
        });
        console.log("✅ Switched to Ganache Network!");
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x539",
                  chainName: "Ganache 5777",
                  rpcUrls: ["http://127.0.0.1:7545"],
                  nativeCurrency: {
                    name: "Ethereum",
                    symbol: "ETH",
                    decimals: 18,
                  },
                },
              ],
            });
            console.log("✅ Ganache Network Added!");
          } catch (addError) {
            console.error("❌ Failed to Add Network:", addError);
            alert("Failed to add Ganache network to MetaMask!");
            return null;
          }
        } else {
          console.error("❌ Failed to Switch Network:", switchError);
          alert("Please switch MetaMask to the Ganache network.");
          return null;
        }
      }
    } else {
      console.log("✅ Already on Ganache Network!");
    }

    return { web3, account: selectedAccount };
  } catch (error) {
    console.error("❌ Connection Error:", error);
    alert("Failed to connect MetaMask!");
    return null;
  }
};

export default connectWallet;
