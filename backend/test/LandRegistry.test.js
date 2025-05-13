const LandRegistry = artifacts.require("LandRegistry");

contract("LandRegistry", (accounts) => {
  let landRegistry;

  // Deploy the contract before running tests
  before(async () => {
    landRegistry = await LandRegistry.deployed();
  });

  it("should register a land", async () => {
    await landRegistry.registerLand("123 Main St", 100, { from: accounts[0] });

    const land = await landRegistry.lands(1);
    assert.equal(land.id.toNumber(), 1, "Incorrect land ID!");
    assert.equal(land.location, "123 Main St", "Incorrect land location!");
    assert.equal(land.price.toNumber(), 100, "Incorrect land price!");
    assert.equal(land.owner, accounts[0], "Incorrect land owner!");
  });

  it("should transfer ownership", async () => {
    await landRegistry.transferOwnership(1, accounts[1], { from: accounts[0] });

    const land = await landRegistry.lands(1);
    assert.equal(land.owner, accounts[1], "Ownership transfer failed!");
  });

  it("should fail to transfer ownership if not the owner", async () => {
    try {
      await landRegistry.transferOwnership(1, accounts[2], {
        from: accounts[0],
      });
      assert.fail("Expected error not received!");
    } catch (error) {
      assert.include(
        error.message,
        "Not the owner!",
        "Incorrect error message!"
      );
    }
  });

  it("should return correct land details", async () => {
    const landDetails = await landRegistry.getLandDetails(1);
    assert.equal(landDetails[0].toNumber(), 1, "Incorrect ID in land details!");
    assert.equal(
      landDetails[1],
      "123 Main St",
      "Incorrect location in land details!"
    );
    assert.equal(
      landDetails[2].toNumber(),
      100,
      "Incorrect price in land details!"
    );
    assert.equal(
      landDetails[3],
      accounts[1],
      "Incorrect owner in land details!"
    );
  });
});
