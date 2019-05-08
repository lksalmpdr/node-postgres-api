module.exports = function(app){
    app.get('/', (request, response) =>{
        response.json({info : 'API com Node.js, Express e Postgres'})
    });


    var getUsers = function(req, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.UsersDAO(connection);

        usersDAO.getUsers(function(err, results){
            if(err){
                throw err
            }
            res.status(200).json(results.rows);
        });
    }

    var getUserById = function(req, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.UsersDAO(connection);
        
        const id = parseInt(req.params.id);

        usersDAO.getUserById(id, function(err, results){
            if(err){
                throw err
            }
            res.status(200).json(results.rows);
        });
    }

    var postUser = function(req, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.UsersDAO(connection);
        
        const {name, email} = req.body;

        usersDAO.postUser({name, email}, function(err, res){
            if(err){
                throw err;
            }
            res.status(201).send(`User added with ID: ${res.insertId}`)
        });

    }

    app.get('/users', getUsers);
    app.get('/users/:id', getUserById);
    app.post('/users', postUser);
}

