const { Router } = require("express");
const elecController = require("../controllers/electricityUnitsController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken"); 

const router = Router();

router.use(verifyUser);

// check units(get)
router.get("/check", elecController.checkAvailableUnits);

router.post("/send", elecController.sendUnits);
// more endpoints for implementing other features

const electricityUnitsRoute = router;

module.exports = electricityUnitsRoute;
