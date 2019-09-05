const port = 5000;
const path = require('path');
const app = require('./config/express.js')();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('css', path.join(__dirname, 'aquelamerdanaofuncioan'))

app.listen(port, function() {
    console.log('App rodando na porta ' + port + ' .');
    
});