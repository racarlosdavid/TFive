require('dotenv').config()

const credentials = {
    host: {   
        hostname: `${process.env.HOST}`  
    }
}

module.exports = credentials;