require('dotenv').config({ path: 'variables.env' });

const cookieParser = require('cookie-parser');

// const getUploadsMiddleware = require('./uploads.js');

const createServer = require('./createServer.js');



const server = createServer();

server.express.use(cookieParser());

// getUploadsMiddleware(server.express);

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, (...args) => console.log('server running:', args));
