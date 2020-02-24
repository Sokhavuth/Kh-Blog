var express = require('express');
var router = express.Router();
var db = require('../db/postlist-index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db(req, res);
});

module.exports = router;
