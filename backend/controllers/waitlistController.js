const { Waitlist } = require("../models/Waitlist");
const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");
const { statusMessages } = require("../constants/responseMessages");
const { statusEnum } = require("../constants/userEnums");

// desc: Get All Users in WaitList
// route: /api/waitlist
// Method: GET
const getWaitlist = asyncHandler(async (req, res) => {
	const waitlist = await Waitlist.find({})
		.populate("user", {
			password: 0,
			__v: 0,
			createdAt: 0,
			updatedAt: 0,
		})
		.select({ __v: 0 });

	if (waitlist.length > 0) {
		res.status(200).json(waitlist);
	} else {
		res.status(404);
		throw new Error(statusMessages.user[404]);
	}
});

module.exports = {
	getWaitlist,
};
