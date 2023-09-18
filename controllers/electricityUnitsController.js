const ElectricityUnits = require("../models/electricityUnits");
const transactionController = require("../controllers/transactionController");

// controller function to check available units
async function checkAvailableUnits(req, res) {
    try {
        const { userId } = req.params;

        // checking if account exists
        let user = await ElectricityUnits.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "Account not found" });
        }

        // checking for available units
        const availableUnits = user.availableUnits;
        return res.status(200).json({ availableUnits: availableUnits })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// controller function to send units
async function sendUnits(req, res) {
    const { userId, receiverId, unitsToSend } = req.body;
    try {
        const userUnits = await ElectricityUnits.findOne({ userId });
        if (!userUnits) {
            res.status(404).json({ message: "User units not found" });
        }
        if (userUnits.availableUnits < unitsToSend) {
            res.status(400).json({ message: "Units not enough for transfer" });
        }
        const receiverUnits = await ElectricityUnits.findOne({ receiverId });
        if (!receiverUnits) {
            res.status(404).json({ message: "Reciever account not found" });
        }
        userUnits.availableUnits -= unitsToSend;
        receiverUnits.availableUnits += unitsToSend;
        userUnits.save();
        receiverUnits.save();

        const transaction = await transactionController.createTransaction(req, res);
        res.status(200).json({ message: "Successfully sent units", transaction });
    } catch (error) {
        
    }
}

module.exports = { checkAvailableUnits, sendUnits };
