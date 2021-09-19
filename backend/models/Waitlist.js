const mongoose = require("mongoose");
const { genderEnum, roleEnum } = require("../constants/userEnums");

const waitlistSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	dateOfEntry: {
		type: Date,
		default: Date.now(),
	},
	remarks: {
		type: String,
	},
});

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = {
	Waitlist,
};
