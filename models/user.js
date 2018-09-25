var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
    role: {
        type: String
    },
    instaUser: {
        type: String
    },
    instaPass: {
        type: String
    },
    code: {
        type: String
    },
    images: {
        type: Array
    },
    accountStatus: {
        type: String
    },
    fbemail: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});

}
module.exports.updatePass = function(userUpdate, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(userUpdate.password, salt, function(err, hash) {
	        userUpdate.password = hash;
            console.log('dope')
            console.log(userUpdate)
	       // newUser.save(callback);
	    });
	});
}


module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}