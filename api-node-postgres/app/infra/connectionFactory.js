const Pool = require('pg').Pool;

function createDBConnection(){
    const pool = new Pool({
        user: 'me',
        host: 'localhost',
        database: 'api',
        password: 'mario',
        port: 5432,
      });
    return pool;
}

module.exports = function(){
    return createDBConnection();
}
