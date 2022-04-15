var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const configs = require('../../config/config');

const secret_map = new Map();

router.post('/create', function(req, res) {
    const {secret,available}=req.body;
    const hash = crypto.randomUUID().substring(0, 5)
    const obj = {
        secret: secret,
        available: available > 1 ? available : 1, 
        counter: 0
    }
    secret_map.set(hash,obj);
    //console.log(req.hostname);
    res.status(200).json({msj:`${configs.host.hostname}/secret/hash/${hash}`, hash:hash, error: null});
});

router.get('/hash/:hash', async function(req, res) {
    const hash = req.params.hash;
    if (secret_map.has(hash)) {
        const info = secret_map.get(hash);

        if (info.counter < info.available) {
            /*I send de UI */
            const index = getHTML(info.secret)
            /*Update the counter*/
            const updated = {...info, counter: ++info.counter} 
            secret_map.set(hash,updated);
            res.send(index);
        }else{
            res.status(301).json({msj:"The secret is no longer available", error: null});
        }
        
    }else{
        res.status(500).json({msj: "The hash does not exist in the database", error: true});
    }
});


router.get('/getAll', function(req, res) {
    let all = [];
    secret_map.forEach((value,key)=>{
        all.push({hash: key, url: value})
    })
    res.status(200).json({msj:all, error: null});
});

router.get('/getAllLinks', function(req, res) {
    let all = [];
    secret_map.forEach((value,key)=>{
        all.push(`${configs.host.hostname}/secret/hash/${key}`)
    })
    res.status(200).json({msj:all, error: null});
});

function getHTML (secret){
    const index = `<!DOCTYPE html>
    <html>
    <head>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <title>Secret</title>
    </head>
    <body>
        <div class="vh-100 d-flex justify-content-center align-items-center">
                <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show me the secret
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">The Secret is: </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${secret}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
                </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    return index;
}

module.exports = router;