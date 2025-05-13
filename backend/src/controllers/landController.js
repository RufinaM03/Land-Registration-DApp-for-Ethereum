const circomlib = require("circomlibjs");
const { web3, landRegistry } = require("../config/web3Config");
const crypto = require("crypto");
const { generateProof } = require("../../utils/proofGenerator");

const GAS_LIMIT = 6000000; // Default Gas Limit

const generateIdentityCommitment = async () => {
  const secretKey = crypto.randomBytes(32); // Generate a random secret key
  const poseidon = await circomlib.buildPoseidon();
  const identityCommitment = poseidon.F.toString(
    poseidon([BigInt("0x" + secretKey.toString("hex"))])
  );

  return {
    secretKey: secretKey.toString("hex"), // This should NOT be stored in the contract
    identityCommitment, // This will be stored in the smart contract
  };
};

// 🔹 Check if user is registered
const checkUser = async (req, res) => {
  try {
    const { account } = req.params;
    const user = await landRegistry.methods
      .isUserRegistered(account)
      .call({ gas: GAS_LIMIT });
    res.status(200).json({
      isRegistered: user[0],
      name: user[1],
      identityCommitment: user[2],
    });
  } catch (error) {
    console.error("User check error:", error);
    res.status(500).send("Failed to check user registration!");
  }
};

// 🔹 Register a new user with zk-identity (With Gas Optimization)
const newRegistration = async (req, res) => {
  try {
    const { name, account } = req.body;
    const { identityCommitment } = await generateIdentityCommitment();

    await landRegistry.methods
      .registerUser(name, identityCommitment)
      .send({ from: account, gas: GAS_LIMIT });

    res.status(200).json({
      message: "User registered successfully!",
      identityCommitment,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Registration failed!");
  }
};

const ProofGeneration = async (req, res) => {
  try {
    const { identity, externalNullifier } = req.body; // ✅ Use params, not query

    if (!identity || !externalNullifier) {
      return res.status(400).send("Missing parameters");
    }

    const { proofArray, nullifierHash } = await generateProof(
      identity,
      externalNullifier
    );

    res.json({ proofArray, nullifierHash });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addProperty = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { propertyId, details, nullifierHash, proof, owner } = req.body;

    const Owner = req.body.owner;

    await landRegistry.methods
      .addProperty(propertyId, details, nullifierHash, proof)
      .send({ from: Owner, gas: GAS_LIMIT });

    res.status(200).send("Property added successfully!");
  } catch (error) {
    console.error("Property addition error:", error);
    res.status(500).send("Failed to add property!");
  }
};

// 🔹 Transfer ownership with zk-proof verification (Optimized)
const transferOwnership = async (req, res) => {
  try {
    const { propertyId, currentOwner, newOwner, nullifierHash, proof } =
      req.body;

    if (!Array.isArray(proof) || proof.length !== 12 || isNaN(nullifierHash)) {
      return res.status(400).send("Invalid input!");
    }

    await landRegistry.methods
      .transferOwnership(propertyId, newOwner, nullifierHash, proof)
      .send({ from: currentOwner, gas: GAS_LIMIT });

    res.status(200).send("Ownership transferred successfully!");
  } catch (error) {
    console.error("Ownership transfer error:", error);
    res.status(500).send("Failed to transfer ownership!");
  }
};

// 🔹 Search for a property (Optimized Call)
const searchProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await landRegistry.methods
      .getProperty(propertyId)
      .call({ gas: GAS_LIMIT });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).send("Property not found!");
  }
};

// 🔹 Get list of all land properties (Optimized Batch Call)
const LandList = async (req, res) => {
  try {
    const propertyIds = await landRegistry.methods
      .getAllPropertyIds()
      .call({ gas: GAS_LIMIT });

    const propertyPromises = propertyIds.map(async (id) => {
      const property = await landRegistry.methods
        .getProperty(id)
        .call({ gas: GAS_LIMIT });

      return {
        propertyId: property[0],
        owner: property[1],
        details: property[2],
        price: property[3],
        isForSale: property[4],
      };
    });

    const allProperties = await Promise.all(propertyPromises);
    res.status(200).json(allProperties);
  } catch (error) {
    console.error("Error fetching land list:", error);
    res.status(500).send("Failed to fetch land list!");
  }
};

const setPrice = async (req, res) => {
  const { propertyId, price, from } = req.body;
  try {
    const tx = await landRegistry.methods
      .setPrice(propertyId, price)
      .send({ from });
    res.json({ success: true, tx });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to set price", details: err.message });
  }
};

const sellProperty = async (req, res) => {
  const { propertyId, price, from } = req.body;

  console.log("Received body:", req.body);

  if (!propertyId || !price || !from) {
    return res.status(400).json({ error: "Missing required fields!" });
  }

  if (isNaN(price)) {
    return res.status(400).json({ error: "Price must be a valid number!" });
  }

  try {
    const tx = await landRegistry.methods
      .sellProperty(propertyId, price)
      .send({ from });

    res.json({ success: true, tx });
  } catch (err) {
    console.error("sellProperty error:", err);
    res.status(500).json({
      error: "Failed to list property for sale",
      details: err.message,
    });
  }
};

const isForSaleLabel = async (req, res) => {
  const { propertyId } = req.params;
  try {
    const isForSale = await landRegistry.methods
      .isForSaleLabel(propertyId)
      .call();
    res.json({ propertyId, isForSale });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to check sale status", details: err.message });
  }
};

const buyProperty = async (req, res) => {
  const { propertyId, from, value } = req.body;
  try {
    const tx = await landRegistry.methods.buyProperty(propertyId).send({
      from,
      value: web3.utils.toWei(value.toString(), "ether"),
    });
    res.json({ success: true, tx });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to buy property", details: err.message });
  }
};

const pay = async (req, res) => {
  const { to, amount, from } = req.body;
  try {
    const tx = await landRegistry.methods.pay(to).send({
      from,
      value: web3.utils.toWei(amount.toString(), "ether"),
    });
    res.json({ success: true, tx });
  } catch (err) {
    res.status(500).json({ error: "Payment failed", details: err.message });
  }
};

module.exports = {
  checkUser,
  newRegistration,
  ProofGeneration,
  addProperty,
  transferOwnership,
  searchProperty,
  LandList,
  setPrice,
  sellProperty,
  isForSaleLabel,
  buyProperty,
  pay,
};
