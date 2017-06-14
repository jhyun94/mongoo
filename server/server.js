var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');

var app = express();
var port = process.env.PORT || 8000;
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

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  })
})

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({});
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      return res.status(404).send({})
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send({});
  })
})

app.listen(port, () => {
  console.log('running on port: ' + port);
});

module.exports = {app};

