const express = require('express');
const cors = require('cors');
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
const con = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.4syq9jj.mongodb.net/univDB';
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))
const {role} = require('./role');

const path = require('path');



app.use(cors({
  origin: ['http://localhost:3000','https://upnch.univ.ht','https://upga.univ.ht'],
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
app.use('/journals', express.static(path.join(__dirname, 'journals')));
app.use('/devoirs', express.static(path.join(__dirname, 'devoirs')));
app.use('/actualites', express.static(path.join(__dirname, 'actualites')));
app.use('/pj', express.static(path.join(__dirname, 'pj')));




//Recuperation des routes

const userRoutes = require('./routes/user');
const anneeRoutes = require('./routes/annee');
const contactRoutes = require('./routes/contact');
const universiteRoutes = require('./routes/universite');
const faculteRoutes = require('./routes/faculte');
const etudiantRoutes = require('./routes/etudiant');
const profRoutes = require('./routes/prof');
const roleRoutes = require('./routes/role');
const mailRoutes = require('./routes/mail');
const matiereRoutes = require('./routes/matiere');
const courRoutes = require('./routes/cour');
const noteRoutes = require('./routes/note');
const devoirRoutes = require('./routes/devoir');
const ressourceRoutes = require('./routes/ressource');
const optionRoutes = require('./routes/option');
const actualiteRoutes = require('./routes/actualite');
const commentRoutes = require('./routes/comment');
const inscriptionRoutes = require('./routes/inscription');
const notecRoutes = require('./routes/notec');
const matierecRoutes = require('./routes/matierec');
const sendmailRoutes = require('./routes/sendmail');
const pjRoutes = require('./routes/piecejointe');
const journalRoutes = require('./routes/journal');

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

app.use('/api/auth', userRoutes);
app.use('/api/annee', anneeRoutes);
app.use('/api/faculte', faculteRoutes);

app.use('/api/contact', contactRoutes);
app.use('/api/universite', universiteRoutes);
app.use('/api/etudiant', etudiantRoutes);
app.use('/api/prof', profRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/matiere', matiereRoutes);
app.use('/api/cour', courRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/devoir', devoirRoutes);
app.use('/api/ressource', ressourceRoutes);
app.use('/api/option', optionRoutes);
app.use('/api/actualite', actualiteRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/inscription', inscriptionRoutes);
app.use('/api/notec', notecRoutes);
app.use('/api/matierec', matierecRoutes);
app.use('/api/sendmail', sendmailRoutes);
app.use('/api/pj', pjRoutes);
app.use('/api/journal', journalRoutes);


app.get('/',(req,res,next)=>{
  //res.sendFile('html/welcome.html');
  res.sendFile(path.join(__dirname+'/html/welcome.html'));
  logger.info("Server Sent A file!");
  //res.end('<h1>server started...</h1>');
});

module.exports = app;