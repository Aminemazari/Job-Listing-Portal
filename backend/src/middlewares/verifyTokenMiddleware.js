const jwt = require("jsonwebtoken");

// Middleware to verify JWT and add to req.user
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get token from cookie

  if (!token) {
    // If no token and user object empty then return 403
    if (!req.user)
      return res
        .status(403)
        .json({
          message: "Access denied. No token provided or Oauth provided",
        });

    return;
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded token payload to req.user
    req.user = decoded;

    // Move to the next middleware or route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
