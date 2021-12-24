var express = require('express');
var router = express.Router();
const { daily, monthly, yearly } = require('./controller');

router.get('/', daily);
router.get('/bulanan', monthly);
router.get('/tahunan', yearly);

module.exports = router;
