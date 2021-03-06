var mongoose = require('mongoose');

// User Schema
var CopySchema = new mongoose.Schema({

    imageLink: {
        type: String
    },
    canvasLink: {
        type: String
},
    status: {
        type: String
    }
});

module.exports = mongoose.model('Copy', CopySchema);