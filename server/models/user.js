const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    minLength: 6,
    trim: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email address`
    }
  },
  password: {
    required: true,
    type: String,
  },
  tokens: [{
    access: {
      required: true,
      type: String
    },
    token: {
      required: true,
      type: String
    }
  }]
});

UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    var decoded = jwt.verify(token, process.env.JWT_secret)
  } catch(e) {
    return Promise.reject();
  }
  
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
  })
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';

  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_secret).toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.toJSON = function() {
  var user = this;

  return _.pick(user, ['email', '_id']);
}

UserSchema.methods.deleteToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  })
}

UserSchema.pre('save', function(next){
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = {User}
