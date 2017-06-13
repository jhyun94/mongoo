var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.status(400).send(err);
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  })
})

app.listen(8000);

module.exports = {app};

