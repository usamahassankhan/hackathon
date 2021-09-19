var cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

// linking to the .env file
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// async uploader function
function uploadToCloudinary(file, filename) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			file,
			{
				resource_type: "auto",
				folder: "Hackathon/profileImages/",
				public_id: filename,
				unique_filename: true,
			},
			(err, result) => {
				if (err) return reject(err);
				fs.unlink(file, function (err) {
					if (err) throw err;
				});
				return resolve(result.url);
			}
		);
	});
}

module.exports = {
	uploadToCloudinary,
};
