var express = require('express');
var router = express.Router();
const crypto = require("crypto");

const shortener_map = new Map();

router.post('/create', function(req, res) {
    const {original_url}=req.body;
    const hash = crypto.randomUUID().substring(0, 5)
    shortener_map.set(hash,{original_url: original_url, counter: 0});
    res.status(200).json({msj:`http://localhost:2000/redirect/hash/`, hash:hash, error: null});
});

router.get('/getAll', function(req, res) {
    let all = [];
    shortener_map.forEach((value,key)=>{
        all.push({hash: key, url: value})
    })
    res.status(200).json({msj:all, error: null});
});

router.get('/hash/:hash', async function(req, res) {
    const hash = req.params.hash;
    if (shortener_map.has(hash)) {
        const info = shortener_map.get(hash);
        res.status(200).json({msj:info, error: null});
    }else{
        res.status(500).json({msj:"error", error:"The hash does not exist in the database"});
    }
});


module.exports = {
    router,
    shortener_map
}