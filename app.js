var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT || 3412);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var types = [
	{idType: 1, name: "Administrador", code: 1},
	{idType: 2, name: "Visitante", code: 2},
];

var users = [
  {idUser: 1, name: "José de Assis Santos da Silva", email: "jassis@cgctec.com.br", password: "123456", type: types[0], creationData: "2018-08-22T03:00:00Z", modifyDate: new Date()},
  {idUser: 2, name: "Bruno Guimarães", email: "bruno@gmail.com", password: "123456", type: types[1], creationData: "2018-08-22T03:00:00Z", modifyDate: new Date()},
  {idUser: 3, name: "Carlos Santos", email: "carlos@gmail.com", password: "123456", type: types[1], creationData: "2018-08-22T03:00:00Z", modifyDate: new Date()},
  {idUser: 4, name: "Maria Clara Alves", email: "maria.clara@gmail.com", password: "123456", type: types[1], creationData: "2018-08-22T03:00:00Z", modifyDate: new Date()},
  {idUser: 5, name: "Cláudia Gomes Martins", email: "cmcacau@gmail.com", password: "123456", type: types[0], creationData: "2018-08-22T03:00:00Z", modifyDate: new Date()},
];

app.post('/login', function(req, res) {
  
  loginUser = req.body;

  users.forEach( function(user) {
    if (user.email === loginUser.email) {
      if (user.password === loginUser.password) {
        res.json(user);
        return;
      }else{
        res.status(404).end();
      }
    };
  });

  res.status(404).end();
});

app.get('/users', function(req, res) {
  res.json(users);
});

app.get('/users/:id', function(req, res) {
  users.forEach(function (user) {
    if (user.idUser == req.params.id) {
      res.json(user);
      return;
    }
  });
  res.status(404).end();
});

app.get('/users/delete/:id', function(req, res) {

  var ids = users.map(function(user){
    return user.idUser;
  });

  var indexUser = ids.indexOf(parseInt(req.params.id));
  if(indexUser>=0){
    var deletedUser = users.splice(indexUser, 1);
    if (deletedUser) {
      res.json(deletedUser);
      return;
    };
  };
  res.status(404).end();
});

app.post('/users', function(req, res) {
  addUser = req.body;
  userExist = users.some(function (user) {
    return user.email == addUser.email
  });

  if (!userExist) {
    users.push(req.body);
    res.json(true);
  }else{
    res.status(404).end();
  };

});

app.post('/users/add/:id', function(req, res) {

  var ids = users.map(function(user){
    return user.idUser;
  });

  var indexUser = ids.indexOf(parseInt(req.params.id));
  
  if(indexUser>=0){
    var updateUser = users.splice(indexUser, 1, req.body);
    if (updateUser) {
      res.json(updateUser);
      return;
    };
  };  
  res.status(404).end();

});

app.get('/types', function(req, res) {
  res.json(types);
});
