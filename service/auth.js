const controller = require('../controllers/auth'); 
// const sessionToUserMap = new Map();
const jwt = require('jsonwebtoken');
require("dotenv").config();
// const secret = "Project#121@!";
const secret = process.env.SCERET;

// function setUser(id, user){
//     sessionToUserMap.set(id, user);
// }

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
        secret,
        {
            expiresIn: "1h"
        }
    );

}
// function getUser(id){
//     return sessionToUserMap.get(id);
// }

function getUser(token) {
    if (!token) return null;
    try {
        console.log("Verifying token:", token);
        const decoded = jwt.verify(token, secret);
        console.log("Decoded Token Data:", decoded);
        return decoded;
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};


// const jwt = require("jsonwebtoken");
// const secret = process.env.SCERET;

// const authenticateToLogin = (req, res, next) => {
//     const authHeader = req.headers.authorization; // Expecting: "Bearer <token>"

//     if (!authHeader) {
//         return res.status(401).json({ message: "Access Denied! No token provided." });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

//     try {
//         const decoded = jwt.verify(token, secret);
//         req.user = decoded; // Attach user data to request object
//         next(); 
//     } catch (error) {
//         return res.status(403).json({ message: "Invalid Token!" });
//     }
// };

// module.exports = authenticateToLogin;
