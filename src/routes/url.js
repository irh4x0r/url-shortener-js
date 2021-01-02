const express = require('express');
const controller = require('../controllers/url.controller');
const router = express.Router();

// @desc    Create short url
// @route   POST /api/v1/url/shorter
// @access  Public

router
    .route("/api/v1/url/shorter")
    .post(controller.create);

// @desc    redirect to shorten url
// @route   Get /:code
// @access  Public

router
    .route("/:code")
    .get(controller.get);


// @desc    change url Code to a custom Url
// @route   PUT /:code
// @access  Public
router
    .route("/:code")
    .put(controller.custom);

module.exports = router;