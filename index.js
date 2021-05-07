require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true }).catch(error => handleError(error))
const Cards = require('./models/cards.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Hello,it's me the app and I'm listening at http://localhost:${port}`)
})

function handleError(error){
  console.log(error);
}