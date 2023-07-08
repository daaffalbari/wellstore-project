const express = require('express');
const router = express.Router();
const { index, viewCreate } = require('./controller');

router.get('/', index);
router.get('/create', viewCreate);

module.exports = router;
