const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('<p>HTML Data</p>');
});

module.exports = router;
