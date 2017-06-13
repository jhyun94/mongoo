const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to db');
  }

  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').deleteMany({name: 'Jon'}).then((results) => {
    console.log(results);
  })

  db.collection('Users').findOneAndDelete({_id: ObjectID("593da5c79400f16544173a09")}).then((results) => {
    console.log(results);
  })

});