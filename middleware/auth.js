require("dotenv").config();
const jwt = require("jsonwebtoken");
// const config = require("config");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token is invalid" });
    }
}