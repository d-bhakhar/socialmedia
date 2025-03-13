const { getUser } = require("../service/auth");

function authenticateToLogin(req, res, next) {
  console.log("Middleware executed");

  const userUid = req.cookies?.token;
  if (!userUid) {
    console.error("Access Denied! No token provided.");
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    const user = getUser(userUid);
    if (!user) {
      console.error("Invalid or expired token.");
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authenticateToLogin;
