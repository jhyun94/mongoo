const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err){
    return console.log('Unable to connect to db');
  }


  db.collection('Users').findOneAndUpdate({
    _id: ObjectID('593db2c29400f16544173ee7')
  }, {
    $set: {
      name: 'Jon'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
});