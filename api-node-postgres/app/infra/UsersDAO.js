function UsersDAO(connection){
    this._connection = connection;
}

UsersDAO.prototype.getUsers = function(callback){
    this._connection.query('SELECT * FROM users ORDER BY id ASC', callback);
}

UsersDAO.prototype.getUserById = function(id, callback){
    this._connection.query('SELECT * FROM users WHERE id = $1', [id], callback);
}

UsersDAO.prototype.postUser = function(user, callback){
    this._connection.query('INSERT INTO users (name, email) VALUES ($1, $2)', user, callback);
}

module.exports = function(){
    return UsersDAO;
}