const mongoose = require("mongoose");


//SCHEMA Setup
var campSchema = new mongoose.Schema({
    name:String,
    url:String,
    disc:String,
    comments: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});
var camp=mongoose.model("camp",campSchema);
module.exports = camp;



