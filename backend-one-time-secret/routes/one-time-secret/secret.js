var express = require('express');
var router = express.Router();
const memo = require('../../content/memory');

router.post('/create', function(req, res) {
    const {secret,available}=req.body;
    res.status(200).json(memo.create(secret,available));
});

router.get('/hash/:hash', async function(req, res) {
    const hash = req.params.hash;
    if (memo.has(hash)) {
        res.send(memo.get(hash))
    }else{
        res.status(500).json({msj: "The hash does not exist in the database", error: true});
    }
});

router.get('/getAll', function(req, res) {
    res.status(200).json(memo.getAll());
});

router.get('/getAllLinks', function(req, res) {
    res.status(200).json(memo.getAllLinks());
});

module.exports = router;