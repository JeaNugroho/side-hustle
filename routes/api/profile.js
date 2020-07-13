require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const opencage = require('opencage-api-client');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private

router.post("/", [ auth, [
    check("address", "Address is required").not().isEmpty()
] ], async (req, res) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        user,
        skills,
        headline,
        description,
        address,
        // city,
        // state,
        facebook,
        instagram,
        youtube,
        linkedin
    } = req.body;
    console.log(skills);

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (address) profileFields.address = address;
    if (skills[0] === "") {
        profileFields.skills = undefined;
    } else {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    if (headline === "") {
        profileFields.headline = undefined;
    } else {
        profileFields.headline = headline;
    }
    if (description === "") {
        profileFields.description = undefined;
    } else {
        profileFields.description = description;
    }
    
    // Build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;

    profileFields.geocode = {};

    try{
        const possibleLocations = await opencage.geocode({ q: profileFields.address, key: process.env.OPEN_CAGE_API_KEY });
        profileFields.geocode.lat = possibleLocations.results[0].geometry.lat;
        profileFields.geocode.lng = possibleLocations.results[0].geometry.lng;
        console.log(profileFields);

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile/skill
// @desc    Get all profiles with a skill
// @access  Public
router.get("/:skill", async (req, res) => {
    try {
        const profiles = await Profile.find({ skills: req.params.skill }).populate("user", ["name", "avatar"]);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile/user/:userId
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:userId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate("user", ["name", "avatar", "email"]);
        // res.json(profile);

        if (!profile) return res.status(400).json({ msg: "Profile not found" });

        profile.mk = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/profile
// @desc    Delete profile & user
// @access  Private
router.delete("/", auth, async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        
        res.json({ msg: "User deleted" });
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/profile/rate/:id
// @desc    Rate a profile
// @access  Private
router.put("/rate/:id", auth, async (req, res) => {
    try {
        
        const profile = await Profile.findById(req.params.id);

        // Block the rate if rate user itself
        if (profile.user.toString() === req.user.id) {
            return res.status(403).json({ msg: "You can not rate your own profile", errorpic: "https://httpstatusdogs.com/img/403.jpg" });
        }

        // Check if profile has been rated
        if (profile.rateroot.ratings.filter(rate => rate.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "You have rated this profile" });
        }

        const newRating = {
            user: req.user.id,
            rate: req.body.rate
        }

        profile.rateroot.ratings.unshift(newRating);

        let sum = Number(profile.rateroot.sum);
        sum += Number(req.body.rate);
        profile.rateroot.sum = sum;

        let count = Number(profile.rateroot.count);
        count++;
        profile.rateroot.count = count;

        profile.rateroot.final = sum / count;

        await profile.save();

        res.json(profile.rateroot);//profile.rateroot.ratings
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;