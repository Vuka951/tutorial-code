require('dotenv').config()
const express = require('express')
const app = express()
const testRoute = require('./routes/example');

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/test', testRoute)

app.listen(process.env.PORT, () => console.log(`Example app listening at http://localhost:${process.env.PORT}`))