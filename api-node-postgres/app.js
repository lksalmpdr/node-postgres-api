const port = 3000;

const app = require('./config/express.js')();

app.listen(port, function() {
    console.log('App rodando na porta ' + port + ' .');
});