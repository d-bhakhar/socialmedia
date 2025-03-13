// const sessionToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "Project#121@!"

// function setUser(id, user){
//     sessionToUserMap.set(id, user);
// }

function setUser (user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret);
}
// function getUser(id){
//     return sessionToUserMap.get(id);
// }

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}
module.exports = {
    setUser,
    getUser
};