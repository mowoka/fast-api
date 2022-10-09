const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./swagger.json')

// import routes
const auth = require('./routes/auth')
const book = require('./routes/book')
// ################


// initial config here
dotenv.config();
const app = express();


mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASS}@cluster0.7eh03if.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('connect to db server')
})
.catch((error) => {
    console.log('can`t connect to db why beacuse : ', error)
})

app.get('/',(req, res) => {
    res.status(200).json({
        message: 'Welcome to Fast api',
    })
}) 

app.use(bodyParser.json())
app.use('/api', auth)
app.use('/api', book)
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerOptions))

app.listen(process.env.PORT || 8080, () => {
    console.log('server listening on port', process.env.PORT || 3000)
})



