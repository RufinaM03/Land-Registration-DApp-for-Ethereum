const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (deployer) {
  const existing = await LandRegistry.deployed();
  const upgraded = await upgradeProxy(existing.address, LandRegistry, {
    deployer,
  });

  console.log("✅ Contract upgraded! New implementation at:", upgraded.address);
};
