const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.status(200).send(process.env.SECRET_VALUE);
});

module.exports = router;
