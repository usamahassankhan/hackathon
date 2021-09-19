const express = require("express");
const {
	addAppointment,
	getAppointmentsByUserId,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

// Base -> api/appointments
const appointmentRouter = express.Router();

appointmentRouter
	.route("/:userId")
	.post(protect, addAppointment)
	.get(protect, getAppointmentsByUserId);

module.exports = {
	appointmentRouter,
};
