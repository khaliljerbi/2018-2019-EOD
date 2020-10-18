const fs = require('fs');
const http2 = require('spdy');

// keys and certificate for http/2

const options = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`),
};

module.exports = (app, PORT) => {
  const server = http2.createServer(options, app);
  require('./ini/SocketIO').init(server);
  server.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Listening on port: ${PORT}.`);
  });
};
