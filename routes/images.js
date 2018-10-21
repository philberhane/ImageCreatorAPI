var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var Image = require('../models/image');

// To see whether a user is checked in or not
var User = require('../models/user');


router.post('/uploadWordpress', function (req, res) {
    
    var imgConvert = require('image-convert');
imgConvert.fromBuffer({
    buf: req.body.source,
    quality: 100,//default 100
    output_format:"jpg",//default jpg
    size: 1000//default original
},function(err,buffer,desfile){
    if(!err)
    {
        var fs = require( "fs" );
var wordpress = require( "wordpress" );

var client = wordpress.createClient({
	url: "https://premiumsneaks.website/",
	username: "johndoex0000000",
	password: "Dope1234"
});

// "Aurora Borealis" by Frederic Edwin Church
// Licensed under Public Domain via Wikimedia Commons

var filename = desfile;
var file = fs.readFileSync( filename );
client.uploadFile({
	name: filename,
	type: "image/jpg",
	bits: file
}, function( error, data ) {
	console.log( arguments );
    console.log('Success')
});
        
    }
})
    
    
    
}) 

router.post('/addImage', function (req, res) {
   var imgArray = req.body.imgArray
    
    console.log(imgArray)
    
    for (i=0; i<imgArray.length;i++) {
        console.log(imgArray[i])
    
    var image = new Image({imageLink: imgArray[i], status: 'active'})
    
    console.log(image)
    
    
    image.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
    }
    
     res.status(200).send({message : 'Success'})
})



router.post('/getImages', function (req, res) {
    Image.find({},  (err, arrayOfImages) => {
        console.log(arrayOfImages)
          if (err) {
                return handleError(err);
            }
        
          if (arrayOfImages.length === 0) {
            res.status(500).send({
			message: 'Error: There are no images!'
		});
        console.log('error')
          }
            else {
                console.log(arrayOfImages)
       res.status(200).send({
            message: arrayOfImages
        })
            }
            
        })
})


router.post('/deleteImage', function (req, res) {
    var imgArray = req.body.imgArray
     for (i=0; i<imgArray.length;i++) {
    
    Image.findByIdAndRemove(imgArray[i], function (err, img) {
    console.log('deleting image', img);
    if (err) {
        throw err;
    }

})
} 
            res.status(200).send({
            message: 'Success'
        })
    
})


router.post('/updateImage', function (req, res) {
    var imgArray = req.body.imgArray
    for (i=0; i<imgArray.length;i++) {
    
    Image.update({_id: imgArray[i]}, {
    status: req.body.status    
}, function(err, affected, resp) {
   
})
    }
    res.status(200).send({message : 'Success'})
    
})



router.post('/emailImage', function (req, res) {
    var source = req.body.source
    var email = req.body.email
    // Email functions goes here
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
  to: email,
 attachments: [
            {path: source}
 ],
  subject: "Lisa Thomas Salon Image",
  html: 'Attached to this email is the image that was created!'
};
        transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
      return res.status(200).send({message : 'Success'})
      
  }
});
})


router.post('/convertImage', function (req, res) {
   let imgConvert = require('image-convert');
    console.log('made it to server')
    
const imgStr = req.body.img;

imgConvert.fromBuffer({
    buffer: req.body.img,
    quality: 100, //quality
    output_format: "jpg", //jpg
    size: "300" //defualt
}, function(err, response, file) {
    if (!err) {
        console.log(file);
        res.end(response);
    } else {
        res.json({
            "Error": err.message
        })
    }
});
    
})




module.exports = router;