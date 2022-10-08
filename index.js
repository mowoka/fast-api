const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')

// import routes
const auth = require('./routes/auth')
const book = require('./routes/book')


// initial config here
dotenv.config();
const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@cluster0.7eh03if.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('connect to db server')

    app.listen(process.env.SERVER_PORT, () =>{
        console.log('server listening on port', process.env.SERVER_PORT)
    })
    // test url
    app.get('/',(req, res) => {
        res.status(200).json({
            message: 'done'
        })
    }) 

    app.use(bodyParser.json())
    app.use('/api', auth)
    app.use('/api', book)
})
.catch((error) => {
    console.log('can`t connect to db why beacuse : ', error)
})
// ################




