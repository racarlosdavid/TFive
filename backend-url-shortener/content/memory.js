const crypto = require("crypto");
const configs = require('../config/config');
const shortener_map = new Map();

function create(original_url){
    const hash = crypto.randomUUID().substring(0, 5)
    shortener_map.set(hash,{original_url: original_url, shortener_url: `${configs.host.hostname}/redirect/hash/${hash}`,counter: 0});
    return {msj:{shortener_url: `${configs.host.hostname}/redirect/hash/${hash}`, hash: hash}, error: null};
}

function getAll(){
    let all = [];
    shortener_map.forEach((value,key)=>{
        all.push({hash: key, url: value})
    })
    return {msj:all, error: null};
}

function has(hash){
    return shortener_map.has(hash);
}
/*
function get(hash){
    const info = shortener_map.get(hash);
    return {msj:info, error: null};
}
*/
function getUpdateRedirect(hash){
    const info = shortener_map.get(hash);
    const updated = {...info, counter: ++info.counter} 
    shortener_map.set(hash,updated);
    return info.original_url;
}

module.exports = {create,getAll,has,getUpdateRedirect}