const express = require('express');
const cors = require('cors');
//const { io } = require('./server'); // Importer l'instance de io

var cookieParser = require('cookie-parser');
var session = require('express-session');
const bodyParser = require('body-parser')

// const { resolve } = require('path');
const fs = require('fs');

const logger = require('./utils/logger');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express(); 
//const con ='mongodb+srv://sironel:Phigando1@cluster0.4syq9jj.mongodb.net/?retryWrites=true&w=majority';
const con = process.env.CON;
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))
const {role} = require('./role');

const path = require('path');



app.use(cors({
  origin: ['http://localhost:3000','https://mbe-1qbt.onrender.com'],
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
//app.use(session({secret: "Shh, its a secret!"}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/actualites', express.static(path.join(__dirname, 'actualites')));
app.use('/pj', express.static(path.join(__dirname, 'pj')));




//Recuperation des routes

//const userRoutes = require('./routes/user')(io);



mongoose.set("strictQuery", false);
//connexion a  la base de donnees
mongoose.connect(con,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !--'+error.message));

  

app.use(express.json());

//Middleware to manage cross over
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//base des routes

//app.use('/api/auth', userRoutes);


app.get('/',(req,res,next)=>{
  //res.sendFile('html/welcome.html');
  res.sendFile(path.join(__dirname+'/html/welcome.html'));
  logger.info("Server Sent A file!");
  //res.end('<h1>server started...</h1>');
});

module.exports = app;