require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.json());
//create a todo
app.post('/todos', authenticate, (req,res) => {
  var newTodo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo.save().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.status(400).send(err);
  })
})
// get all todos
app.get('/todos', authenticate,  (req, res) => {
  Todo.find({_creator: req.user._id}).then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
})
// get an individual todo
app.get('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  }

  Todo.findOne({_id: id, _creator: req.user._id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  })
})
// delete a todo
app.delete('/todos/:id', authenticate,  (req,res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.deleteOne({_id: id, _creator: req.user._id}).then((todo) => {
    if (!todo){
      return res.status(404).send({})
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send({});
  })
})
// update a todo
app.patch('/todos/:id', authenticate,  (req,res) => {
  var id = req.params.id;

  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    res.status(404).send({});
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completedAt = null;
    body.completed = false;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch((e) => {
    res.status(404).send();
  })
})
//usrs
//sign up
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var newUser = new User(body);

  newUser.save().then(() => {
    return newUser.generateAuthToken();
  }).then((token) =>{
    res.header('x-auth', token).send(newUser);
  }).catch((e) => {
    res.status(404).send(e);
  })
});


//authenicate
app.get('/users/me', authenticate,  (req,res) => {
  res.send(req.user);
})


//login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  })
})
//user logout
app.delete('/users/me/token', authenticate, (req,res) => {
  req.user.deleteToken(req.token).then((user) => {
    res.status(200).send();
  }).catch((e) => {
    res.status(400).send();
  })
})
app.listen(port, () => {
  console.log('running on port: ' + port);
});

module.exports = {app};

