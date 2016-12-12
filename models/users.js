var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// create user schema
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  sexe: { type: String, enum: ['Homme', 'Femme'] },
  location: String,
  birth: { type: Date, default: null },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null }
});

// create a model using schema
var User = mongoose.model('User', userSchema);

// hash password before inserting new user
function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = {
  getUser : function getUser(id) {
    return User.findById(id);
  },
  getAllUsers : function getAllUsers() {
    return User.find({});
  },
  updateUser : function updateUser(id, params) {
    return User.update(
      { _id: id },
      { name: params.name,
        password: hashPassword(params.password),
        sexe: params.sexe,
        location: params.location,
        birth: params.birth,
        created_at: Date.now(),
      }
    )
  },
  deleteUser : function deleteUser(id) {
    return User.remove({ _id: id});
  },
  insertUser : function insertUser(params) {
    // prepare user before insert
    var user = new User({
      name: params.name,
      email: params.email,
      password: hashPassword(params.password),
      role: params.role,
      sexe: params.sexe,
      location: params.location,
      birth: params.birth,
      created_at: Date.now(),
    });

    // insert user
    return user.save();
  }
}
