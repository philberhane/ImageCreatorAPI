var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var Image = require('../models/image');

// To see whether a user is checked in or not
var User = require('../models/user');


router.post('/addImage', function (req, res) {
    imgArray = req.body.array
    
    for (i=0; i<imgArray;i++) {
    
    var image = new Image(imgArray[i])
    
    
    image.save( (err, model) => {
            
           
                console.log(model, 'saved!!!')
                
        })
    }
    
     res.status(200).send({message : 'Your image has been successfully created!'})
}
})


router.post('/getImages', function (req, res) {
    Image.find({},  (err, arrayOfImages) => {
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
    Image.findByIdAndRemove(req.body.id, function (err, img) {
    console.log('deleting image', img);
    if (err) {
        throw err;
    }
    res.status(200).send({
            message: 'Success'
        })
}) 
    
})


router.post('/updateImage', function (req, res) {
    Image.update({_id: req.body.id}, {
    imageCopyLink: req.body.imageCopyLink,
    canvasLink: req.body.canvasLink
    
}, function(err, affected, resp) {
   res.status(200).send({message : 'Your image has been successfully updated!'})
})
    
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
  html: 'Attached to this email is the image that was created! /n' + '<img src ="' + source + '" />'
};
        transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
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