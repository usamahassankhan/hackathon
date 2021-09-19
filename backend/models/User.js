const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const { genderEnum, roleEnum, statusEnum } = require("../constants/userEnums");

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is a required field."],
		},
		lastName: {
			type: String,
			required: [true, "Last name is a required field."],
		},
		password: {
			type: String,
			required: [true, "Last name is a required field."],
		},
		phone: {
			type: String,
			required: [true, "Phone number is a required field."],
		},
		status: {
			type: Number,
			enum: Object.values(statusEnum),
			default: statusEnum.waiting,
		},
		therapyArea: {
			type: Array,
			default: [],
		},
		dob: {
			type: Date,
		},
		gender: {
			type: Number,
			enum: Object.values(genderEnum),
		},
		address: {
			type: String,
		},
		email: {
			type: String,
		},
		img: {
			type: String,
		},
		role: {
			type: Number,
			enum: Object.values(roleEnum),
			default: roleEnum.patient,
		},
	},
	{
		timestamps: true,
	}
);

// compares the entered and saved passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// encrypts password before saving to db
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.index({ phone: 1, unique: true });

const User = mongoose.model("User", userSchema);

module.exports = {
	User,
};
