const PoseidonT3 = artifacts.require("PoseidonT3");
const IncrementalBinaryTree = artifacts.require("IncrementalBinaryTree");

module.exports = async function (deployer) {
  await deployer.deploy(PoseidonT3);
  await deployer.link(PoseidonT3, IncrementalBinaryTree);
  await deployer.deploy(IncrementalBinaryTree);
};
