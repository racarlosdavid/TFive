const crypto = require("crypto");
const configs = require('../config/config');
const secret_map = new Map();

function create(secret,available){
    const hash = crypto.randomUUID().substring(0, 5)
    const obj = {
        secret: secret,
        available: available > 1 ? available : 1, 
        counter: 0
    }
    secret_map.set(hash,obj);
    return {msj:`${configs.host.hostname}/secret/hash/${hash}`, hash:hash, error: null};
}

function get(hash){
    const info = secret_map.get(hash);
    if (info.counter < info.available) {
        /*Update the counter*/
        const updated = {...info, counter: ++info.counter} 
        secret_map.set(hash,updated);
        /*I send de UI */
        return getHTML(info.secret);
    }else{
        return getHTMLExpired();
    }
}

function getAll(){
    let all = [];
    secret_map.forEach((value,key)=>{
        all.push({hash: key, url: value})
    })
    return {msj:all, error: null};
}

function getAllLinks(){
    let all = [];
    secret_map.forEach((value,key)=>{
        all.push(`${configs.host.hostname}/secret/hash/${key}`)
    })
    return {msj:all, error: null};
}

function has(hash){
    return secret_map.has(hash);
}

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

function getHTMLExpired (){
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
                
        <img src="https://raw.githubusercontent.com/racarlosdavid/TFive/main/Img/SecretNotFound.png" alt="Trulli" width="500" height="333">
           
        </div>
    </body>
    </html>
    `;
    return index;
}

module.exports = {create,get,getAll,getAllLinks,has}