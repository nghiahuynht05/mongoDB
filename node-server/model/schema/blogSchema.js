var bluebird = require("bluebird");
var mongoose = bluebird.promisifyAll(require("mongoose"));
var Schema = mongoose.Schema;

var BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, default: "" },
    body: { type: String, default: "" },
    comments: [
      {
        body: { type: String, default: "" },
        date: { type: Date, default: Date.now },
      },
    ],
    hidden: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    meta: {
      votes: Number,
      favs: Number,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { collection: "Blog", versionKey: false }
);

//a setor
BlogSchema.path("title").set(function (inputString) {
  return inputString[0].toUpperCase() + inputString.slice(1);
});

module.exports = mongoose.model("Blog", BlogSchema);
