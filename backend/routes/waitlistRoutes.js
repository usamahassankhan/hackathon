const express = require("express");
const { getWaitlist } = require("../controllers/waitlistController");
const { protect } = require("../middleware/authMiddleware");

// Base -> api/waitlist

const waitlistRouter = express.Router();

waitlistRouter.route("/").get(getWaitlist);

module.exports = {
	waitlistRouter,
};
