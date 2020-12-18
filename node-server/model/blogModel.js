var mongoose = require('mongoose');

var Blog = mongoose.model('Blog');


function BlogModel() {

}

BlogModel.prototype.save = function () {
    console.log("sssssssssssssssssssss");
    return true
};

module.exports = BlogModel;
