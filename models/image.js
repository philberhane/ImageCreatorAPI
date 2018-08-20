var mongoose = require('mongoose');

// User Schema
var ImageSchema = new mongoose.Schema({

    imageLink: {
        type: String
    },
    imageCopyLink: {
        type: String
    },
    canvasLink: {
        type: String
    }
});

module.exports = mongoose.model('Image', ImageSchema);

