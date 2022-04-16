var express = require('express');
var router = express.Router();
const memo = require('../../content/memory');

router.post('/create', function(req, res) {
    //const {original_url}=req.body;
    //const hash = crypto.randomUUID().substring(0, 5)
    //shortener_map.set(hash,{original_url: original_url, shortener_url: `${configs.host.hostname}/redirect/hash/${hash}`,counter: 0});
    //res.status(200).json({msj:{shortener_url: `${configs.host.hostname}/redirect/hash/${hash}`, hash: hash}, error: null});
    const {original_url}=req.body;
    res.status(200).json(memo.create(original_url));
});

router.get('/getAll', function(req, res) {
    res.status(200).json(memo.getAll());
});
/*
router.get('/hash/:hash', async function(req, res) {
    
    const hash = req.params.hash;
    if (shortener_map.has(hash)) {
        const info = shortener_map.get(hash);
        res.status(200).json({msj:info, error: null});
    }else{
        res.status(500).json({msj:"The hash does not exist in the database", error:true});
    }
    
    const hash = req.params.hash;
    if (memo.has(hash)) {
        res.status(200).json(memo.get(hash));
    }else{
        res.status(500).json({msj:"The hash does not exist in the database", error:true});
    }
});
*/

module.exports = router;
