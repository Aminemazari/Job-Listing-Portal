const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	// 1) create a transporter 

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT, 
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false, 
		},
	});

	// 2) Define email Options 
	const emailOptions = {
		from: `Job-Listing-APP < ${process.env.EMAIL_USER} >`,
		to: options.email,
		subject: options.subject,
		html: options.message,
	};
	// 3) send email
	await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
