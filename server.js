const http = require('http');
const app = require('./app');

// Fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Gestion des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') throw error;
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Créer le serveur HTTP
const server = http.createServer(app);

// Intégrer Socket.IO
const { Server } = require('socket.io');
//const io = new Server(server);


const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000','https://mbe-1qbt.onrender.com'], // Remplace "*" par l'URL spécifique de ton frontend, par exemple : "http://localhost:8080"
    methods: ["GET", "POST"], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Les en-têtes que tu veux autoriser
    credentials: true // Si tu utilises des cookies ou des sessions, définis-le sur true
  }
});

// Gestion des événements de connexion Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Passer `io` aux routes ici (après l'initialisation de Socket.IO)
const userRoutes = require('./routes/user')(io);
app.use('/api/auth', userRoutes);

// Gestion des erreurs du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrer le serveur
server.listen(port);
