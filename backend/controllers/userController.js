const { User } = require("../models/User");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");
const { statusMessages } = require("../constants/responseMessages");
const { Waitlist } = require("../models/Waitlist");
const { uploadToCloudinary } = require("../config/cloudinaryConfig");
const { roleEnum } = require("../constants/userEnums");

// desc: Register new User
// route: /api/user
// Method: POST
const registerUser = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		password,
		phone,
		dob,
		gender,
		address,
		email,
		role,
	} = req.body;

	let img;
	if (req.file) {
		// uploading to cloudinary
		img = await uploadToCloudinary(req.file.path, phone);
	}
	// checking to see if account already exists for phone.
	let checkUser = await User.findOne({
		phone: phone,
	});

	if (checkUser) {
		res.status(400);
		throw new Error(statusMessages.user[400]);
	} else {
		const user = new User({
			firstName,
			lastName,
			password,
			phone,
			dob,
			gender,
			address,
			email,
			role,
			img: img,
		});

		try {
			let createdUser = await user.save();

			// adding user to waitlist if he is a patient.
			if (role && role === roleEnum.patient) {
				const waitlistEntry = new Waitlist({
					user: createdUser._id,
				});
				let addedEntry = await waitlistEntry.save();
			}

			createdUser = await User.findById(createdUser._id).select({
				__v: 0,
				password: 0,
			});
			res.status(201).json(createdUser);
		} catch (error) {
			throw new Error(error.message);
		}
	}
});

// desc: Authenticate User
// route: /api/user/login
// Method: POST
const authenticateUser = asyncHandler(async (req, res) => {
	const { phone, password } = req.body;
	try {
		const user = await User.findOne({ phone });
		if (user && (await user.matchPassword(password))) {
			res.status(200);
			res.json({
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					phone: user.phone,
					dob: user.dob,
					gender: user.gender,
					address: user.address,
					email: user.email,
					role: user.role,
				},
				accessToken: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Invalid phone number or password.");
		}
	} catch (error) {
		throw new Error(error.message);
	}
});

// desc: Authenticate User Token and return user
// route: /api/user/me
// Method: GET
const authenticateToken = asyncHandler(async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId).select({
			password: 0,
			__v: 0,
		});
		if (user) {
			res.status(200).json({ user });
		} else {
			throw new Error(statusMessages.user[404]);
		}
	} catch (error) {
		throw new Error(error.message);
	}
});

// // desc: Add Appointment to Therapist
// // route: /api/user/appointment/:userId
// // Method: POST
// const addAppointment = asyncHandler(async (req, res) => {
// 	const userId = req.params.userId;
// 	const appointment = req.body;
// 	try {
// 		const user = await User.findById(userId);
// 		if (user) {
// 			// Adding new appointment to array.
// 			updatedAppointments = [...user.appointments];
// 			updatedAppointments.push(appointment);
// 			user.appointments = updatedAppointments;
// 			const updatedUser = await user.save();

// 			console.log(updatedUser.appointments);
// 			res.status(200).json({ appointments: user.appointments });
// 		} else {
// 			throw new Error(statusMessages.user[404]);
// 		}
// 	} catch (error) {
// 		throw new Error(error.message);
// 	}
// });

module.exports = {
	registerUser,
	authenticateUser,
	authenticateToken,
	// addAppointment,
};
