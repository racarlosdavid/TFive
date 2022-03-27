var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.status(200).send("Server One Time Secret - Up and Running");
});

module.exports = router;