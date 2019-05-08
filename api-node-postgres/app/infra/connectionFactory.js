const Pool = require('pg').Pool;

function createDBConnection(){
    const pool = new Pool({
        user: ,
        host: 'localhost',
        database: 'api',
        password: ,
        port: 5432,
      });
    return pool;
}

module.exports = function(){
    return createDBConnection();
}
