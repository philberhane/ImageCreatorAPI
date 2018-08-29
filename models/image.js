var mongoose = require('mongoose');

// User Schema
var ImageSchema = new mongoose.Schema({

    imageLink: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('Image', ImageSchema);

