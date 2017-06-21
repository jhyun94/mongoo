// const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');

// var data = {
//   id: '4'
// }

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'salt').toString()
// }


// var resulthash = SHA256(JSON.stringify({id: '4'}) + 'salt').toString();

// if (resulthash === token.hash){
//   console.log(true);
// } else {
//   console.log(false);
// }

// const jwt = require('jsonwebtoken');

// var data = {
//   id: 4
// }
// var token = jwt.sign(data, 'secret');
// var decoded = jwt.verify(token, 'secret');
// console.log(decoded);

var password = "password123";

var hashedPassword = bcrypt.genSalt(10, (err, salt) => {
  return bcrypt.hash(password, salt, (err, hash) => {
    return hash;
  })
})

console.log(hashedPassword);
