const MobileWallet = require("../models/mobileWalletModel");

// Controller function to create a new mobile wallet
async function createMobileWallet(req, res) {
  try {
    const { userId } = req.body;

    // Check if the user already has a mobile wallet
    const existingWallet = await MobileWallet.findOne({ userId });

    if (existingWallet) {
      return res.status(400).json({ message: "Mobile wallet already exists for this user" });
    }

    // Create a new mobile wallet
    const wallet = new MobileWallet({ userId });
    await wallet.save();

    return res.status(200).json({ message: "Mobile wallet created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to get the mobile wallet balance
async function getWalletBalance(req, res) {
  try {
    const { userId } = req.body;

    // Find the mobile wallet document for the user
    const wallet = await MobileWallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: "Mobile wallet not found for this user" });
    }

    return res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to deposit funds into the mobile wallet
async function depositFunds(req, res) {
    try {
        const { userId, amount } = req.body;
    
        // Find the user's mobile wallet
        const wallet = await MobileWallet.findOne({ userId });
    
        if (!wallet) {
          return res.status(404).json({ message: "Mobile wallet not found for this user" });
        }
    
        // Use Bionic API to initiate a deposit transaction
        // Replace 'YOUR_API_KEY' with your actual Bionic API key
        // Make an API request to deposit 'amount' into the user's wallet
        // Handle the API response
    
        // Update the mobile wallet balance in your database
        wallet.balance += amount;
        await wallet.save();
    
        return res.status(200).json({ message: "Funds deposited successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  

// Controller function to withdraw funds from the mobile wallet
async function withdrawFunds(req, res) {
    try {
        const { userId, amount } = req.body;
    
        // Find the user's mobile wallet
        const wallet = await MobileWallet.findOne({ userId });
    
        if (!wallet) {
          return res.status(404).json({ message: "Mobile wallet not found for this user" });
        }
    
        // Ensure the user has sufficient balance for withdrawal
        if (wallet.balance < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }
    
        // Use Bionic API to initiate a withdrawal transaction
        // Replace 'YOUR_API_KEY' with your actual Bionic API key
        // Make an API request to withdraw 'amount' from the user's wallet
        // Handle the API response
    
        // Update the mobile wallet balance in your database
        wallet.balance -= amount;
        await wallet.save();
    
        return res.status(200).json({ message: "Funds withdrawn successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  

// Controller function to transfer funds between mobile wallets
async function transferFunds(req, res) {
    try {
        const { senderId, receiverId, amount } = req.body;
    
        // Find the sender's and receiver's mobile wallets
        const senderWallet = await MobileWallet.findOne({ userId: senderId });
        const receiverWallet = await MobileWallet.findOne({ userId: receiverId });
    
        if (!senderWallet || !receiverWallet) {
          return res.status(404).json({ message: "Mobile wallet not found for one of the users" });
        }
    
        // Ensure the sender has sufficient balance for the transfer
        if (senderWallet.balance < amount) {
          return res.status(400).json({ message: "Insufficient balance" });
        }
    
        // Use Bionic API to initiate a funds transfer transaction
        // Replace 'YOUR_API_KEY' with your actual Bionic API key
        // Make an API request to transfer 'amount' from sender to receiver
        // Handle the API response
    
        // Update the mobile wallet balances in your database
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        await senderWallet.save();
        await receiverWallet.save();
    
        return res.status(200).json({ message: "Funds transferred successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }  
  }
  

module.exports = {
  createMobileWallet,
  getWalletBalance,
  depositFunds,
  withdrawFunds,
  transferFunds,
};
