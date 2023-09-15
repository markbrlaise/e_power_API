const { Router } = require("express");
const userController = require("../controllers/userController");

const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");
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

// assign role


// deleteUser
router.delete("/:userId", verifyUser, userController.deleteUser);

// userDetails
router.get("/data", verifyUser, userController.userDetails);

// const userRoute = router;

module.exports = router;
