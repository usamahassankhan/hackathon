const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const morgan = require("morgan");
const fs = require("fs");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { userRouter } = require("./routes/userRoutes");
const { waitlistRouter } = require("./routes/waitlistRoutes");
const { appointmentRouter } = require("./routes/appointmentRoutes");

// establishing connection to the db
connectDB();

// intializing express app
const app = express();

// enabling cors for all origins
app.use(cors());

// checking if the uploads folder exists and creating the folder if it doesnt exist
const dir = "./uploads";
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

// using the built in json parser for parsing requests.
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Setting up morgan for logging requests to server
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("hackathon backend api is running.");
});

app.use("/api/users", userRouter);
app.use("/api/waitlist", waitlistRouter);
app.use("/api/appointments", appointmentRouter);

// error and not found middleware.
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
