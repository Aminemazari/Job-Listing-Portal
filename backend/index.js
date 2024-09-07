const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const ApiError = require("./src/utils/apiError");
const morgan = require("morgan");
const globalError = require("./src/middlewares/errorMiddleware");
const cors = require("cors");
const dbConnection = require("./src/db/connect");
const authRouter = require("./src/routes/auth.route");
// Set Up Global Middleware

// Enable different domain to access your application
app.use(cors());
app.options("*", cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
	res.send("Hello, World!");
});
app.use("/api/v1/auth", authRouter);

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
