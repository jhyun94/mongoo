const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to db');
  }

  console.log('Connected to mongodb server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert', err)
  //   }

  //   console.log(JSON.stringify(result.ops), undefined, 2);
  // })

  // db.collection('Users').insertOne({
  //   name: 'jon',
  //   age: 23,
  //   location: 'Dallas, TX'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert to database');
  //   }
  //   console.log(JSON.stringify(result.ops), undefined, 2);
  // })
  // db.close();
})

