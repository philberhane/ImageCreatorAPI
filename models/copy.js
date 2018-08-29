var mongoose = require('mongoose');

// User Schema
var CopySchema = new mongoose.Schema({

    copy: {
        type: String
    }
});

module.exports = mongoose.model('Copy', CopySchema);