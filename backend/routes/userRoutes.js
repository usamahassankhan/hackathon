const express = require("express");
const {
	registerUser,
	authenticateUser,
	authenticateToken,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../config/storageEngine");

// Base -> api/users

const userRouter = express.Router();

userRouter.route("/").post(upload.single("img"), registerUser);
userRouter.route("/login").post(authenticateUser);
userRouter.route("/me").get(protect, authenticateToken);

module.exports = {
	userRouter,
};
