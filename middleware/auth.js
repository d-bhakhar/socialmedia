const getUser = require("../service/auth");

async function authenticateToLogin(req, res, next) {
  // const userUid = req.cookies?.uid;
  const userUid = req.cookies?.token;

  if (!userUid) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  const user = getUser(userUid);
  if (!user) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  req.user = user;
  next();
}

// async function checkAuth(req, res, next) {
//   const userUid = req.cookies?.token;

//   const user = getUser(userUid);

//   req.user = user;
//   next();
// }

module.exports = {
  authenticateToLogin,
  // checkAuth,
};