const statusMessages = Object.freeze({
	user: {
		400: "Account already exists for given phone number.",
		401: "Access Unauthorized.",
		404: "User not Found.",
	},
	therapist: {
		401: "Access Unauthorized",
		404: "Therapist not found.",
	},
});

module.exports = {
	statusMessages,
};
