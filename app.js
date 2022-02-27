const express = require('express')
const exphbs = require('express-handlebars')
const bodyPars = require('body-parser')
const mySQL = require('mysql');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

// Parsing Middlewar
// Parse Application
app.use(bodyParser.urlencoded({ extended: false }))

// Parse Application/Json
app.use(bodyParser.json());


app.use(express.static('public'))



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})