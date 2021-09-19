const genderEnum = Object.freeze({
	male: 1,
	female: 2,
});

const roleEnum = Object.freeze({
	patient: 1,
	therapist: 2,
	admin: 3,
});

const therapyEnum = Object.freeze({
	OT: 1,
	PT: 2,
	ST: 3,
});

const statusEnum = Object.freeze({
	waiting: 1,
	enrolled: 2,
	pending: 3,
	done: 4,
});

module.exports = {
	genderEnum,
	roleEnum,
	statusEnum,
	therapyEnum,
};
