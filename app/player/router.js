const express = require('express');
const router = express.Router();
const { landingPage, detailPage } = require('./controller');

router.get('/landingPage', landingPage);
router.get('/detailPage/:id', detailPage);

module.exports = router;
