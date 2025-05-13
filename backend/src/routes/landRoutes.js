const express = require("express");
const router = express.Router();
const {
  newRegistration,
  ProofGeneration,
  addProperty,
  transferOwnership,
  searchProperty,
  LandList,
  checkUser,
  setPrice,
  sellProperty,
  isForSaleLabel,
  buyProperty,
  pay,
} = require("../controllers/landController");

router.get("/isUserRegistered/:account", checkUser);
router.post("/register", newRegistration);
router.post("/add-property", addProperty);
router.post("/transfer-ownership", transferOwnership);
router.get("/search-property/:propertyId", searchProperty);
router.get("/land-list", LandList);
router.post("/generateProof", ProofGeneration);
router.post("/set-price", setPrice);
router.post("/sell-property", sellProperty);
router.get("/is-for-sale/:propertyId", isForSaleLabel);
router.post("/buy-property", buyProperty);
router.post("/pay", pay);

module.exports = router;
