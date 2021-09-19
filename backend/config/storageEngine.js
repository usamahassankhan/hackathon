const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// configuring the options for file storage
const storage = multer.diskStorage({
	// setting the destination path for uploaded files
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	// updating the filenames of the files before saving
	filename: function (req, file, cb) {
		cb(null, uuidv4() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

module.exports = {
	upload,
};
