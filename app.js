const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const port = process.env.PORT || 7000

const userRoute = require('./routes/user.route')
const orderRoute = require('./routes/order.route')
const itemRoute = require('./routes/item.route')
const {createConnection} = require('./DB/connection')
createConnection()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api/user' , userRoute)
app.use('/api/order' , orderRoute)
app.use('/api/item' , itemRoute)


app.listen(port , ()=> console.log('> running on port : ' + port))