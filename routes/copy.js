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
            
            res.status(201).send({message : 'Your event has been successfully created!'})
                console.log(model, 'saved!!!')
                
        })
    })




module.exports = router;