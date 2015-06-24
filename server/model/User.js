/**
 * User.model
 * Database
 */

var mongoose 			= require('mongoose');
var Schema 				= mongoose.Schema;
var ObjectId 			= Schema.Types.ObjectId;

var bcrypt 				= require('bcrypt');
var SALT_WORK_FACTOR 	= 10;

// Schema Mongoose
var userSchema = new mongoose.Schema({
  email: {
  	type: String,
  	required: true,
  	index: {
  		unique: true
  	}
  },
  password: {
  	type: 'string',
  	require: true
  }
});

// Hash the password
userSchema.pre('save', function (next) {

	var user = this;

	// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// Compare password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    


    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.statics.login = function (body, cb) {

  this.find({email: body.email}, function (err, user) {

    if (err) return cb(err, null);

    if (user.length < 1) return cb('no data', null);

    console.log(user);

    bcrypt.compare(body.password, user[0].password, function(err, isMatch) {
        
        if (err) return cb(err);
        cb(null, isMatch);

    });
  });
};


var User = mongoose.model('User', userSchema);
