const mongoose = require("mongoose");
const { statusEnum, therapyEnum } = require("../constants/userEnums");

const appointmentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	appointmentDate: {
		type: Date,
	},
	therapist: {
		type: String,
	},
	therapyType: {
		type: Number,
		enum: Object.values(therapyEnum),
	},
	status: {
		type: Number,
		enum: Object.values(statusEnum),
		default: statusEnum.enrolled,
	},
	paymentStatus: {
		type: Boolean,
		default: false,
	},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
	Appointment,
};
