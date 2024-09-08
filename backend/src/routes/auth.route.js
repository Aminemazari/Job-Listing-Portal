const express = require("express");
const passport = require("passport");
const userModel = require("../db/models/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const axios = require("axios");
const {
	signUpController,
	codeVerification,
	signInController,
	resendVerificationCode,
	ensureAuthenticated,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/verifyCode", codeVerification);
router.post("/signIn", signInController);
router.post("/resendVerifyCode", resendVerificationCode);

// Oauth For : (Google - Linkedin )

// 1-Google

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async function (req, accessToken, refreshToken, profile, done) {
			try {
				let user = await userModel.findOne({
					googleId: profile.id,
				});
				if (!user) {
					// check if email isn't used in other account
					user = await userModel.findOne({ email: profile.emails[0].value });
					if (user) {
						return done(null, {
							message: `${profile.emails[0].value} Email Already In use`,
						});
					}

					// we will create user with this credential
					user = {
						username: profile.displayName,
						email: profile.emails ? profile.emails[0].value : null, // Check if emails array exists
						profileImage: profile.photos
							? profile.photos[0].value
							: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", // Check if photos array exists
						googleId: profile.id,
					};
				}
				req.user = user;
				return done(null, user); // Return the user instance
			} catch (error) {
				return done(error); // Pass any error to the done callback
			}
		}
	)
);
passport.serializeUser(async (user, done) => {
	const oldUser = await userModel.findOne({ email: user.email });
	if (oldUser) user = oldUser;
	done(null, user);
});

passport.deserializeUser(async (user, done) => {
	try {
		done(null, user);
	} catch (error) {
		done(error);
	}
});
router.get("/profile", ensureAuthenticated, (req, res) => {
	res.json({ user: req.user });
});
router.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/api/v1/auth/profile");
	});
});

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	async function (req, res) {
		// Successful authentication, redirect .
		// redirect weather first signup or logged in
		const user = await userModel.findOne({ email: req.user.email });
		if (!user) {
			// complete signUp
			await userModel.create({
				...req.user,
			});
			res.redirect("/select-role");
		} else if (!user.role) {
			res.redirect("/select-role");
		} else {
			res.redirect(
				user.role === "employer"
					? "/employer-dashboard"
					: "/job-seeker-dashboard"
			);
		}
	}
);

// 1-Linkedin
passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_KEY,
			clientSecret: process.env.LINKEDIN_SECRET,
			callbackURL: process.env.LINKEDIN_CALLBACK_URL,
			scope: ["profile", "email", "openid"],
			state: true,
		},
		async function (req, accessToken, refreshToken, profile, done) {
			try {
				let user = await userModel.findOne({
					linkedinId: profile.id,
				});
				if (!user) {
					// check if email isn't used in other account
					user = await userModel.findOne({ email: profile.email });
					if (user) {
						return done(null, {
							message: `${profile.email} Email Already In use`,
						});
					}

					// we will create user with this credential
					user = {
						username: profile.displayName,
						email: profile.email ? profile.email : null, // Check if emails array exists
						profileImage: profile.picture
							? profile.picture
							: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", // Check if photos array exists
						linkedinId: profile.id,
					};
				}
				req.user = user;

				return done(null, user); // Return the user instance
			} catch (error) {
				return done(error); // Pass any error to the done callback
			}
		}
	)
);

router.get(
	"/linkedin",
	passport.authenticate("linkedin", { scope: ["profile", "email", "openid"] })
);
router.get(
	"/linkedin/callback",
	passport.authenticate("linkedin", {
		failureRedirect: "/",
	}),
	async function (req, res) {
		// Successful authentication, redirect .
		// redirect weather first signup or logged in
		const user = await userModel.findOne({ email: req.user.email });
		if (!user) {
			// complete signUp
			await userModel.create({
				...req.user,
			});
			res.redirect("/select-role");
		} else if (!user.role) {
			res.redirect("/select-role");
		} else {
			res.redirect(
				user.role === "employer"
					? "/employer-dashboard"
					: "/job-seeker-dashboard"
			);
		}
	}
);

module.exports = router;
