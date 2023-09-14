const http = require('http');
const app = require('./app');
const server = http.createServer(app);
// import database
require('./database/db');

// check whether production or development server

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on ${process.env.BASE_URL}:${port}`);
});