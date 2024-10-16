var express = require('express');
var router = express.Router();
const controller = require('../controllers/about');

/* GET the About page. */
router.get('/', controller.about);

module.exports = router;