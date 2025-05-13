const LandRegistry = artifacts.require("LandRegistry");
const Semaphore = artifacts.require("Semaphore");

const SEMAPHORE_ADDRESS = Semaphore.address;

module.exports = function (deployer) {
  deployer
    .deploy(LandRegistry, SEMAPHORE_ADDRESS, { gas: 6721975 })
    .then((instance) => {
      console.log("Contract deployed at address:", instance.address);
      console.log("Transaction hash:", instance.transactionHash);
    })
    .catch((error) => {
      console.error("Deployment failed:", error);
    });
};
