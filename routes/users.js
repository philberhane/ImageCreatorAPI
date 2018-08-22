var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var request = require('request');
var fs = require('fs');

var User = require('../models/user');


router.get('/register', function (req, res) {
   console.log('success')
    
})

// Login Error
router.get('/loginError', function (req, res) {
	res.redirect('loginError.html');
});




// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email.toLowerCase();
	var password = req.body.password;
	var password2 = req.body.password2;
    var instaUser = req.body.instaUser;
    var instaPass = req.body.instaPass;
    var role = req.body.role;
    var active = req.body.active;

	// Validation
	req.checkBody('name', 'Name is required!').notEmpty();
	req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('instaUser', 'Instagram Username is required!').notEmpty();
    req.checkBody('instaPass', 'Instagram Password is required!').notEmpty();
	req.checkBody('email', 'Email is not valid!').isEmail();
	req.checkBody('password', 'Password is required!').notEmpty();
	req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
        console.log(errors)
		return res.status(500).send({
			message: 'Error: ' + errors[0].msg
		});
	} else {
        console.log('test1')
        var Client = require('instagram-private-api').V1;
var device = new Client.Device(instaUser);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/' + instaUser + '.json');
        // And go for login
Client.Session.create(device, storage, instaUser, instaPass)
	.then(function(session) {
    console.log('test1')
   		// Now you have a session, we can follow / unfollow, anything...
		// And we want to follow Instagram official profile
		return [session, Client.Account.searchForUser(session, 'instagram')]
	}, function(err) {
        return res.status(500).send({
			message: 'Error: Instagram Username/Password is invalid! Please Try again.'
		});
});
    console.log('test1')
            
    
		//checking for email is already taken
		
			User.findOne({ email: email}, function (err, mail) {
                console.log('test1')
                    
                    if (mail) {
                        return res.status(500).send({
			             message: `Error: A user with the email ${mail.email} already exists! Try another.`
		              });
                    }
				
				else {
                  //  var activationNumber = Math.floor((Math.random() * 100) + 54);
                    
					var newUser = new User({
						name: name,
						email: email,
                        instaUser: instaUser,
                        instaPass: instaPass,
						password: password,
                        role : role
                        
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	res.status(200).send({
                message: 'You have successfully signed up! Please <a href="login.html">Login</a> to continue.'
                })

            }
            }
        )
            


         
    
 }
})
			

passport.use('local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
return done(null, false, {message: 'this account does not exist'});
                User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'oops! wrong password! try again'});
      }
    });

                // all is well, return user
              
            });
        });

    }));




passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send(401,{ success : false, message : 'Error failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.status(200).send({
                message: 'Success',
                id: req.user.id,
                role: req.user.role,
                images: req.user.images
                }) ;        
    });
  })(req, res, next);
});









router.post('/uploadIG', function (req, res) {
    User.find({_id: req.body.id},  (err, user) => {
          if (err) {
                return handleError(err);
            }
       
            var instaUser = user[0].instaUser
            var instaPass = user[0].instaPass
            var caption = req.body.caption
            var source = req.body.source
            console.log(source)
            var rs = req.body.rs
            console.log(rs)
        
        let imgConvert = require('image-convert');
imgConvert.fromURL({
    url: source,
    quality: 100,//default 100
    output_format:"jpg",//default jpg
    size: 300//default original
},function(err,buffer,file){
    if(!err)
    {
        
        console.log(file);
        var Client = require('instagram-private-api').V1;
var device = new Client.Device(instaUser);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/' + instaUser + '.json');
        
            // And go for login
Client.Session.create(device, storage, instaUser, instaPass)
	.then(function(session) {
   		// Now you have a session, we can follow / unfollow, anything...
		// And we want to follow Instagram official profile
		return [session,Client.Upload.photo(session, file.buffer)]  
	})
	.spread(function(session, upload) {
		 return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
	})
	.then(function(medium) {
		console.log(medium.params)
		// {followedBy: ... , following: ... }
		// Yey, you just followed @instagram
    res.status(200).send({
      message: 'Success'  
    })
	})
    }
})
        
            
  
            
            
            
        })
})


module.exports = router;