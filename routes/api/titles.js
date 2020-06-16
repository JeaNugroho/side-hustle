const express = require("express");
const router = express.Router();

// @route   GET api/titles
// @desc    Test route
// @access  Public
router.get("/:requestedTitle", (req, res) => {
    res.send(req.params.requestedTitle);
});

module.exports = router;