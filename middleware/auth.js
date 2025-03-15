// const { getUser, setUser } = require("../service/auth");

// function authenticateToLogin(req, res, next) {
//   const token = req.cookies?.token ||   // Check cookies for token
//     req.header("Authorization")?.split(" ")[1]; // Check headers for token
//     console.log("Extracted Token:", token);
//   if (!token) {
//     console.error("Access Denied! No token provided.");
//     return res
//       .status(401)
//       .json({ message: "Access Denied! No token provided." });
//   }
//   try {
//     const decodedUser = getUser(token);  
//     if (!decodedUser) {
//       console.error("Invalid or expired token.");
//       return res.status(401).json({ message: "Invalid or expired token." });
//     }
//     req.user = decodedUser;
//     next();
//   } catch (error) {
//     return res.status(400).json({ message: "Invalid token." });
//   }
// }

// module.exports = authenticateToLogin;


const { getUser } = require("../service/auth");

function authenticateToLogin(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("No token provided in request.");
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        console.log("Received Token:", token);
        const decodedUser = getUser(token);
        console.log("Decoded User from Token:", decodedUser);

        if (!decodedUser) {
            console.log("Token verification failed or expired.");
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        req.user = decodedUser; // Attach decoded user data to request
        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return res.status(400).json({ message: "Invalid token." });
    }
}

module.exports = authenticateToLogin;