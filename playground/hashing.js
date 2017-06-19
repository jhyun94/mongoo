const bcrypt = require('bcryptjs');

var password = 'password123';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// })

hashedPassword = '$2a$10$AEYnBcEJ.h.Qu.u88TZbLufQj4o6nESCW02nFcN.j4i34BxkW.KOu'
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})