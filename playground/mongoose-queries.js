const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');


var id = '5940513e9400f165441772e3'

// if (!ObjectID.isValid(id)) {
//   console.log('invalid id');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo ', todo)
// });

// Todo.findById(id).then((todo) => {
//   console.log('todo by id', todo);
// }).catch((e) => {
//   console.log(e);
// })

User.findById(id).then((user) => {
  if (user === null) {
   return  console.log('user does not exist');
  }
  console.log('user', user)
}, (err) => {
  console.log(err);
})