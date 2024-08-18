var mongoose = require("mongoose");
const Blogschema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

var BlogModel = mongoose.model("Blog",Blogschema);
module.exports = BlogModel;