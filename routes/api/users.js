// require("dotenv").config();
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", [
    check("name", "Full name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 12 or more characters").isLength({ min: 12 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        // If user already exists:
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }]});
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        });

        // Create the new user as object
        user = new User({name, email, avatar, password});

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user
        await user.save();

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get("JWTSECRET"),
            // process.env.JWTSECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error!");
    }

    
});

module.exports = router;