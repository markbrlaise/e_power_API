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

// send reset password link
router.post('/reset-password', verifyUser, userController.resetPasswordLink);

// reset password
router.post('/:userId/:token', userController.resetPassword);

// deleteUser
router.delete("/:userId", verifyUser, userController.deleteUser);

// userDetails
router.get("/data", verifyUser, userController.userDetails);

module.exports = router;
