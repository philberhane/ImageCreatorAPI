var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var Image = require('../models/image');

// To see whether a user is checked in or not
var User = require('../models/user');


router.post('/addImage', function (req, res) {
    data = req.body
    const image = new Image(data)
    
    
    image.save( (err, model) => {
            
            res.status(200).send({postId: model._id, message : 'Your event has been successfully created!'})
                console.log(model, 'saved!!!')
                
        })
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
    if (err)
        throw err;
    
}) 
    
})


router.post('/updateImage', function (req, res) {
    Image.update({_id: req.body.id}, {
    imageCopyLink: req.body.imageCopyLink,
    canvasLink: req.body.canvasLink
    
}, function(err, affected, resp) {
   console.log('updated!');
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
  text: 'Attached to this email is the image that was created!'
};
        transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
      console.log('Emails Sent!')
  }
});
})




module.exports = router;