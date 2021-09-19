const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.decode(token, process.env.JWT_SECRET);
			req.userId = decoded.userId;
			next();
		} catch (error) {
			res.status(401).json({
				error: "Authorization failed. Token failed.",
			});
		}
	} else {
		res.status(400).json({
			error: "Authorization failed. No token found.",
		});
	}
};

module.exports = {
	protect,
};
