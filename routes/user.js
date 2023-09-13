import { Router } from "express";
const userController = require("../controllers/userController");
import { verifyUser, verifyAdmin } from "../middleware/verifyToken";
const router = Router();

// signUp
router.post("/", userController.signUp);

// login
router.post("/login", userController.login);

// updateUser
router.patch("/:userId", verifyUser, userController.updateUser);

// reset password
router.post('/reset-password', resetPassword);

// deleteUser
router.delete("/:userId", verifyUser, userController.deleteUser);

// userDetails
router.get("/data", verifyUser, userController.userDetails);

module.exports = router;
