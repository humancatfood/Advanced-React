require('dotenv').config({ path: 'variables.env' });

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const getUploadsMiddleware = require('./uploads.js');

const createServer = require('./createServer.js');



const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {

  const { token } = req.cookies;

  if (token) {
    req.userID = jwt.verify(token, process.env.APP_SECRET).userID;
  }

  next();

});

// getUploadsMiddleware(server.express);

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, (...args) => console.log('server running:', args));
