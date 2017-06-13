// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to db');
  }

  console.log('Connected to mongodb server');



  // db.collection('Todos').find({
  //   _id: new ObjectID('593c67fdfa2c031a5c96605d')
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs,  undefined, 2))
  // }, (err) => {
  //   console.log('unable to fetch todos ', err);
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todo count: ${count}`);
  // }, (err) => {
  //   console.log('unable to fetch todos ', err);
  // })

  // db.collection('Users').find({name: 'Jon'}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch data');
  // })
  // db.close();
})

