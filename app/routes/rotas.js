const { check, validationResult } = require('express-validator')

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
        const user = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            res.render('/cadastrar').json({ errors: errors.array() , user : user})
            return
        }

        //execução sem erros
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.UsersDAO(connection);
        
        //não usar o user, mandar como array
        const {nome, email} = req.body;

        usersDAO.postUser([nome, email], function(err, resultado){
            if(err){
                throw err;
            }
            res.redirect(`/users/`);
        });
    }

    app.get('/users', getUsers);
    app.get('/users/:id', getUserById);
    app.post('/users', [
        check('email') //.assert('email', 'É obrigatório informar o e-mail')
        , check('nome').isLength({min : 3})//.assert('nome', 'É obrigatório informar o nome com pelo menos 3 letras ')
    ], postUser);
    app.get('/cadastrar', (req, res)=>res.render('user.ejs'));
}

