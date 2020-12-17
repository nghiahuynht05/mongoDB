var bluebird = require('bluebird');
var mongoose = bluebird.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    hidden: Boolean,
    date: Date,
    meta: {
        votes: Number,
        favs: Number
    }
}, { "collection": "Blog", versionKey: false })

module.exports = mongoose.model('Blog', BlogSchema)