var express = require('express');
var router = express.Router();
const controller = require('../controllers/news');

/* GET travel page. */
router.get('/', controller.news);

module.exports = router;