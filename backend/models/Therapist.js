const mongoose = require("mongoose");

const therapistSchema = mongoose.Schema({
	Qualifications: {
		type: Array,
	},
});
