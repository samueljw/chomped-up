require("dotenv").config()
const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3002
app.use(cors()) 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
 
app.use ('/', router)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 

module.exports = app