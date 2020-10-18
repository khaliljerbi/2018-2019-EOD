const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// application inital configuration
require('./ini/initial_config')(app);
// database configuration
require('./ini/databse')();
// application routes
require('./ini/routes')(app);

/** ***********   Serving the client app  ********************* */
require('./serveClient')(app);

/** ***********   HTTP/1.1  Serving ********************* */
const server = app.listen(PORT, () => console.log(`App listening to port: ${PORT} ... `));
require('./ini/SocketIO').init(server);

module.exports = server;
/** ***********   HTTP/2  BETA TESTING  ********************* */
// require('./http2Server')(app, PORT);
