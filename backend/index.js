const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const globalError = require("./src/middlewares/errorMiddleware");
const session = require("express-session");
const ApiError = require("./src/utils/apiError");
const dbConnection = require("./src/db/connect");
const authRouter = require("./src/routes/auth.route");
const jobRouter = require("./src/routes/job.route");
const resumeRouter = require("./src/routes/resume.route");
const employerRouter = require("./src/routes/employer.route");
const seekerRouter = require("./src/routes/seeker.route");
const applicationRouter = require("./src/routes/application.route");

const port = process.env.PORT || 3000;
// Set Up Global Middleware

// Enable different domain to access your application
app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}
app.use(
	session({
		secret: process.env.SESSION_SECRET, // Replace with a strong secret key
		resave: false,
		saveUninitialized: false,
		// cookie: { secure: false }, // Set to true if using HTTPS
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	res.send("Home");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/employer", employerRouter);
app.use("/api/v1/seeker", seekerRouter);
app.use("/api/v1/application", applicationRouter);

// For Handling Unknown Endpoint
app.all("*", (req, res, next) => {
	next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});
// For Handling Error
app.use(globalError);

async function main() {
	try {
		dbConnection();
		const server = app.listen(port, () => {
			console.log(`Server Is listening on port ${port}`);
		});
		process.on("unhandledRejection", (err) => {
			console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
			// just in case of the current request
			server.close(() => {
				console.error(`Shutting down....`);
				process.exit(1);
			});
		});
	} catch (error) {
		console.error(`There is problem while running this app ${error}`);
		process.exit(1);
	}
}

main();
