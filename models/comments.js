const mongoose = require("mongoose");


var commentsSchema=mongoose.Schema({
    author:String,
    comment_text:String
});

var Comment= mongoose.model("comment",commentsSchema);


module.exports=Comment;