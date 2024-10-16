var express = require('express');
var router = express.Router();
const controller = require('../controllers/meals');

/* GET the Meals page. */
router.get('/', controller.meal);

module.exports = router;