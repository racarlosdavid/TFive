var express = require('express');
var router = express.Router();
var {shortener_map} = require('./shortener');

router.get('/hash/:hash', async function(req, res) {
    const hash = req.params.hash;
    if (shortener_map.has(hash)) {
        const info = shortener_map.get(hash);
        const updated = {...info, counter: ++info.counter} 
        shortener_map.set(hash,updated);
        res.redirect(301,info.original_url)
    }else{
        res.status(500).json({msj:"The hash does not exist in the database", error: true});
    }
});

module.exports = router;