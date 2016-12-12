var mongoose = require('mongoose');

// create user schema
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')
var salt = "$2a$10$d1pLNBpvTeQFnDk/2PFjKu"

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

module.exports = {

  getUser : function getUser(id) {
    return user.findOne({ _id : Id}, function(err, db){
        return db
      })
  },

  getAllUsers : function getAllUsers() {
    return user.find({}).sort({createdAt : 'ascending'}).exec(function(err, docs){  
      if (err) console.log("error : " + err) 
      
      return Promise.all(docs)
    })
  },

  updateUser : function updateUser(id, params) {
    var hash = bcrypt.hashSync(params.password, salt)

    return user.update({ _id : Id}, { $set : {name : params["name"], role : params["role"], location : params["location"], password : hash, updated_at : Date.now(), created_at :  }}).exec()

  },

  deleteUser : function deleteUser(id) {
    return user.remove({ _id : userId }, function(err){
        if (err) {console.log("erreur " + err)} 
    })
  },

  insertUser : function insertUser(params) {
    var hash = bcrypt.hashSync(params.password, salt)
    // prepare user before insert
    var user = new User({
      name: params.name,
      email: params.email,
      password: hash,
      role: params.role,
      sexe: params.sexe,
      location: params.location,
      birth: params.birth,
      created_at: Date.now(),
    });

    // insert user
    return user.save(function (err) {
      if (err) console.log('Error on saving');
    });
  }
}
