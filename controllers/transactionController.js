const Transaction = require('../models/transaction');

async function createTransaction(req, res) {
  try {
    const { transactionType, userId, electricityUnits, transactionAmount, transactionStatus } = req.body;

    // Create a new transaction
    const transaction = new Transaction({
      transactionType,
      userId,
      electricityUnits,
      transactionAmount,
      transactionStatus,
    });

    await transaction.save();

    return res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllTransactions(req, res) {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();

    return res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTransaction(req, res) {
  try {
    const { id } = req.params;

    // Retrieve a specific transaction by ID from the database
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTransactionsByUser(req, res) {
  try {
    const { id } = req.params;

    // Retrieve all transactions for a specific user from the database
    const transactions = await Transaction.find({ userId: id });

    return res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  getTransactionsByUser,
};
