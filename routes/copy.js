var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var Copy = require('../models/copy');


router.post('/addCopy', function (req, res) {
    
    data = req.body
    const copy = new Copy(data)
    
    copy.save( (err, model) => {
            
            res.status(201).send({message : 'Success'})
                console.log(model, 'saved!!!')
                
        })
    })


router.post('/getCopy', function (req, res) {
    Copy.find({},  (err, arrayOfCopy) => {
        console.log(arrayOfCopy)
          if (err) {
                return handleError(err);
            }
        
          if (arrayOfCopy.length === 0) {
            res.status(500).send({
			message: 'Error: There is no copy!'
		});
        console.log('error')
          }
            else {
                console.log(arrayOfCopy)
       res.status(200).send({
            message: arrayOfCopy
        })
            }
            
        })
})



router.post('/deleteCopy', function (req, res) {
    var copyArray = req.body.copyArray
     for (i=0; i<copyArray.length;i++) {
    
    Copy.findByIdAndRemove(copyArray[i], function (err, cop) {
    console.log('deleting copy', cop);
    if (err) {
        throw err;
    }

})
} 
            res.status(200).send({
            message: 'Success'
        })
    
})

/* router.get('/deleteCopy', function (req, res) {
    var copyArray = req.body.copyArray
    
    Copy.findByIdAndRemove('5b87899d637757001400802b', function (err, cop) {
    console.log('deleting copy', cop);
    if (err) {
        throw err;
    }

})

            res.status(200).send({
            message: 'Success'
        })
    
}) */


router.post('/updateCopyStatus', function (req, res) {
    var copyArray = req.body.copyArray
    for (i=0; i<copyArray.length;i++) {
    
    Copy.update({_id: copyArray[i]}, {
    status: req.body.status    
}, function(err, affected, resp) {
   
})
    }
    res.status(200).send({message : 'Success'})
    
})


router.post('/saveCopy', function (req, res) {
    var id = req.body.id
    var imageLink = req.body.imageLink
    var canvasLink = req.body.canvasLink
    
    Copy.update({_id: id}, {
    imageLink: imageLink,
    canvasLink : canvasLink
}, function(err, affected, resp) {
   
})
    res.status(200).send({message : 'Success'})
    
})


module.exports = router;