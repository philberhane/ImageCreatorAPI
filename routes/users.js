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

router.post('/updateFacebookNull', function(req, res) {

        
        User.update({_id: req.body.id}, {
    fbemail: req.body.fbemail
    
}, function(err, affected, resp) {
       
}) 
    return res.status(200).send({message : 'Success'}); 
    
    
    
    
})
    
    

router.post('/updateFacebook', function(req, res) {
    
    User.findOne({fbemail: req.body.fbemail}, function (err, user)   {
        if (err) {
            throw err;
        }
        
        console.log(user)
        
        
        if (user && user._id !== req.body.id) {
            return res.status(500).send({message : 'Error: A user with this Facebook Account already exists!'}); 
        }
        
        User.update({_id: req.body.id}, {
    fbemail: req.body.fbemail
    
}, function(err, affected, resp) {
       
}) 
    return res.status(200).send({message : 'Success'}); 
    })
    
    
    
})


router.post('/updateInstagram', function(req, res, next) {
    
    User.findOne({instaUser: req.body.instaUser}, function (err, user)   {
        if (user && user._id !== req.body.id) {
            return res.status(500).send({message : 'Error: A user with this Instagram Account already exists!'}); 
        }
    })
    
    
    User.update({_id: req.body.id}, {
    instaUser: req.body.instaUser,
    instaPass: req.body.instaPass
    
}, function(err, affected, resp) {
       
}) 
    return res.status(200).send({message : 'Success'}); 
    
})


router.post('/getSocial', function(req, res, next) {
    User.findOne({_id: req.body.id}, function (err, user)   {
    // Generate a JSON response reflecting authentication status
    var fbStatus;
    var igStatus;
        
    if (!user.fbemail) {
        fbStatus = 'none'
    } else {
        fbStatus = 'exists'
    }
        
    if (!user.instaUser) {
        igStatus = 'none'
    } else {
        igStatus = 'exists'
    }
        
       return res.status(200).send({message1 : fbStatus, message2: igStatus }); 
        
        
        
    })
    
})


// Login Error
router.get('/loginError', function (req, res) {

                
                res.send({message: 'Error: 3'})

});

router.post('/verifyCode', function (req, res) {
    
    User.findOne({code: req.body.code}, function (err, user)   {
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).send({message : 'Error: This code is incorrect!' });
    } else {
        return res.status(200).send({message : 'Success' });
    }  
        
    })
    
})


router.post('/changePassword', function (req, res) {
    var code = req.body.code;
    var password3 = req.body.password3;
    var password4 = req.body.password4;
    
    req.checkBody('password3', 'Password is required!').notEmpty();
	req.checkBody('password4', 'Passwords do not match!').equals(req.body.password3);
	

	var errors = req.validationErrors();

	if (errors) {
        console.log(errors)
		return res.status(500).send({
			message: 'Error: ' + errors[0].msg
		});
	}
    
    console.log('dope1')
    
    User.update({code: req.body.code}, {
    password: password3
    
}, function(err, affected, resp) {
         
})
    
     console.log('dope2')
    
    
     User.findOne({code: req.body.code}, function (err, userUpdate)  {
          console.log('dope3')
        
         User.updatePass(userUpdate, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	res.status(200).send({
                message: 'Thank you for signing up, your account is pending approval!'
                })
         
     })
    
    
    
    
    
    
    
})


router.post('/forgotPassword', function (req, res) {
    
    User.findOne({email: req.body.email}, function (err, user)  {
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).send({message : 'Error: No user matches this email' });
    }
    if (user.accountStatus === 'inactive')
        {
      return res.status(500).send({message : 'Error: No user matches this email' });
    }
      
    // Generate a random six digit code
        var code = Math.floor(Math.random()*90000) + 10000;
    // Store the code to the user object
        User.update({email: req.body.email}, {
    code: code
    
}, function(err, affected, resp) {
}) 
    // Email the user the code
        var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'lisathomassalonemailer@gmail.com',
    pass: 'LisaThomas1!'
  }
});
        

var mailOptions = {
  from: 'lisathomassalonemailer@gmail.com',
  to: req.body.email,
  subject: "Here's your code",
  text: "Forgot your password? Use this code to reset it: \n" + code
};
        transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
      return res.status(200).send({
                message: 'Success'
                })
  }
});
    });
  })
    



router.post('/testIGLogin', function (req, res) {
    
    var instaUser = req.body.instaUser;
    var instaPass = req.body.instaPass;
    
    
    var Client = require('instagram-private-api').V1;
var device = new Client.Device(instaUser);
var storage = new Client.CookieFileStorage(__dirname + '/cookies/' + instaUser + '.json');
    var dope = '';
        // And go for login
Client.Session.create(device, storage, instaUser, instaPass)
    
	.then(function(session) {
    console.log('test')
    
   		// Now you have a session, we can follow / unfollow, anything...
		// And we want to follow Instagram official profile
		dope = 'dope'
    console.log(dope)
   return res.status(200).send({
                message: 'Success'
                })
	})

	
process.on('unhandledRejection', function(reason, p) {
  console.log("Unhandled Rejection:", reason.stack);
    res.status(500).send({
                message: 'Error'
                })
})
    
    
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
    var accountStatus = req.body.accountStatus;
    var fbemail = req.body.fbemail

	// Validation
	req.checkBody('name', 'Name is required!').notEmpty();
	req.checkBody('email', 'Email is required!').notEmpty();
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
        
            
    
		//checking for email is already taken
		
			User.findOne({ email: email}, function (err, mail) {
                console.log('test1')
                    
                    if (mail) {
                        return res.status(500).send({
			             message: 'Error: A user with the email ' + mail.email + ' already exists! Try another.'
		              });
                    }
				
				else {
                  //  var activationNumber = Math.floor((Math.random() * 100) + 54);
                    
					var newUser = new User({
						name: name,
						email: email,
                        instaUser: instaUser,
                        instaPass: instaPass,
                        role : role,
                        accountStatus: accountStatus,
                        fbemail : fbemail,
                        password: password
                        
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	res.status(200).send({
                message: 'Thank you for signing up, your account is pending approval!'
                })

            }
            }
        )
            


         
    
 }
});
			

passport.use('local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
    console.log(email)
    console.log('email')
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
            User.findOne({ 'email' :  email }, function(err, user) {
                console.log(user)
                console.log('user')
                // if there are any errors, return the error
               if (err) throw err;

                // if no user is found, return the message
                if (!user) {
                    console.log(user)
                }
                
                
                    console.log('user')
                    return done(null, false, {message: 'this account does not exist'});
                User.comparePassword(password, user.password, function (err, isMatch) {
                        if(err) throw err;
                        if(isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: 'oops! wrong password! try again'});
                            }
                    });

                // all is well, return user
              
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


router.post('/fblogin', function(req, res, next) {
      User.findOne({fbemail: req.body.fbemail},  function (err, user)  {
    console.log('find user')
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).send({message : 'Error' });
    }
    if (user.accountStatus === 'inactive')
        {
      return res.status(500).send({message : 'Error' });
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
  })
});

router.post('/adminLogin',
	passport.authenticate('local', { failureRedirect: '/routes/users/loginError' }), function (req, res) {
    console.log(req.user)
    if (!req.user) {
      return res.status(500).send({message : 'Error: not user' });
    }
          if (req.user.accountStatus === 'inactive') {
      return res.status(500).send({message : 'Error 2' });
        }
    
    return res.status(200).send({
                message: 'Success',
                id: req.user.id,
                role: req.user.role,
                images: req.user.images
                })     
	}); 


router.post('/getUsers', function(req, res, next) {
  
        User.find({}, function (err, arrayOfUsers) {
          if (err) {
                return handleError(err);
            }
            
            res.status(200).send({
            message: arrayOfUsers
        })
            
        })
});

router.post('/deleteUser', function(req, res, next) {
    User.findByIdAndRemove(req.body.id, function (err, user) {
    console.log('deleting user', user);
    if (err) {
        throw err;
    }
        res.status(200).send({
            message: 'Success'
        })

})
} );
            





router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email.toLowerCase()}, function (err, user)   {
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).send({message : 'Error: 1' });
    }
      
    if (req.body.password === user.password) {
         return res.status(200).send({
                message: 'Success',
                id: user._id,
                role: user.role,
                images: user.images
                })     
    } else {
        return res.status(500).send({
                message: 'Error: 2'
        })
    }
      
  })
});



router.post('/changeStatus', function(req, res, next) {
 User.update({_id: req.body.id}, {
    accountStatus: req.body.accountStatus
    
}, function(err, affected, resp) {
   res.status(200)
})   
    
});




router.post('/uploadIG', function (req, res) {
    User.find({_id: req.body.id}, function (err, user) {
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
        
        var imgConvert = require('image-convert');
imgConvert.fromURL({
    url: source,
    quality: 100,//default 100
    output_format:"jpg",//default jpg
    size: 1000//default original
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