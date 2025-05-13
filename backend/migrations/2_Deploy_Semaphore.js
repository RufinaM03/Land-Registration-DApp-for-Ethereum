const Semaphore = artifacts.require("Semaphore");
const IncrementalBinaryTree = artifacts.require("IncrementalBinaryTree");
const Verifier = artifacts.require("Verifier"); // Add this line

module.exports = async function (deployer) {
  await deployer.link(IncrementalBinaryTree, Semaphore);

  // 🔹 Deploy Verifier Contract first
  await deployer.deploy(Verifier);
  const verifierInstance = await Verifier.deployed();
  const verifierAddress = verifierInstance.address;

  // 🔹 Now pass the Verifier contract address into Semaphore
  const verifiers = [{ contractAddress: verifierAddress, merkleTreeDepth: 20 }];

  await deployer.deploy(Semaphore, verifiers);
};
