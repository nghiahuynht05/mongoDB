var bluebird = require("bluebird");
var mongoose = bluebird.promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    collection: "User",
    versionKey: false
});

module.exports = mongoose.model("User", UserSchema);