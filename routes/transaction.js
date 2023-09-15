const { Router } = require("express");
const transactionController = require("../controllers/transactionController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");
const ElectricityUnits = require("../models/electricityUnits");
const mobileWallet = require("../models/mobileWallet");
const router = Router();

router.use(verifyUser);


// Buy electricity units and create a transaction
router.post("/buy", async (req, res) => {
  try {
    const { userId, unitsToBuy } = req.body;

    // Fetch the user's mobile wallet balance
    const mobileWallet = await mobileWallet.findOne({ userId });

    if (!mobileWallet) {
      return res.status(404).json({ message: "Mobile wallet not found for this user" });
    }

    // Calculate the total cost based on the unit price
    
    const electricityUnits = await ElectricityUnits.findOne({ userId });
    const totalCost = electricityUnits.unitPrice * unitsToBuy;
    // get total cost from a elecController function
    
    // Check if the user has a sufficient balance
    if (mobileWallet.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance in the mobile wallet" });
    }

    // Deduct the cost from the mobile wallet balance
    mobileWallet.balance -= totalCost;
    await mobileWallet.save();

    // Update the available electricity units
    if (!electricityUnits) {
      return res.status(404).json({ message: "Electricity units not found for this user" });
    }

    electricityUnits.availableUnits += unitsToBuy;
    await electricityUnits.save();

    // Create a transaction for the purchase
    const transaction = await transactionController.createTransaction(req, res);

    // Return the transaction as an e-receipt
    return res.status(200).json({ message: "Electricity units purchased", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all transactions (requires admin access)
router.get("/transactions", verifyAdmin, transactionController.getAllTransactions);

// Get all transactions for a user
router.get("/transactions/:id", transactionController.getTransactionsByUser);

// Get a transaction
router.get("/transactions/:id/:transactionId", transactionController.getTransaction);

const transactionRoute = router;

module.exports = transactionRoute;
