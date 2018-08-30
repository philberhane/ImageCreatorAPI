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
            
            res.status(201).send({message : 'Your copy has been successfully created!'})
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


module.exports = router;