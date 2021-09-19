const { Waitlist } = require("../models/Waitlist");
const { User } = require("../models/User");
const { Appointment } = require("../models/Appointment");
const asyncHandler = require("express-async-handler");
const { statusMessages } = require("../constants/responseMessages");
const { statusEnum } = require("../constants/userEnums");

// desc: Create new appointment
// route: /api/appointment/:userId
// Method: POST
const addAppointment = asyncHandler(async (req, res) => {
	const { appointmentDate, therapist, therapyType, status, paymentStatus } =
		req.body;
	const userId = req.params.userId;

	// checking to see if account exists.
	let checkUser = await User.findById(userId);

	if (checkUser) {
		const entry = new Appointment({
			user: userId,
			appointmentDate: appointmentDate,
			therapist: therapist,
			therapyType: therapyType,
			status: status,
			paymentStatus: paymentStatus,
		});

		const created = await entry.save();
		res.status(200).json(created);
	} else {
		res.status(404);
		throw new Error(statusMessages.user[404]);
	}
});

// desc: Get all appointments for user
// route: /api/appointment/:userId
// Method: GET
const getAppointmentsByUserId = asyncHandler(async (req, res) => {
	const userId = req.params.userId;

	const appointments = await Appointment.find({ user: userId });
	res.status(200).json(appointments);
});

module.exports = {
	addAppointment,
	getAppointmentsByUserId,
};
