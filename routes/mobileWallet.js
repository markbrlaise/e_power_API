const { Router } = require("express");
const mobileWalletController = require("../controllers/mobileWalletController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

const router = Router();

// Middleware for checking if a user is logged in
router.use(verifyUser);

// Create a new mobile wallet (POST)
router.post("/", mobileWalletController.createMobileWallet);

// Get mobile wallet balance (GET)
router.get("/balance", mobileWalletController.getWalletBalance);

// Deposit funds into the mobile wallet (POST)
router.post("/deposit", mobileWalletController.depositFunds);

// Withdraw funds from the mobile wallet (POST)
router.post("/withdraw", mobileWalletController.withdrawFunds);

// Transfer funds between mobile wallets (POST)
router.post("/transfer", mobileWalletController.transferFunds);

// Add more endpoints as needed for your project

const mobileWalletRoute = router;

module.exports = mobileWalletRoute;
