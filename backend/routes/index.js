var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send("Server TFive - Up and Running");
});

module.exports = router;