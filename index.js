//Initialization
const express         =  require("express");
const app             =  express();
const bodyparser      =  require("body-parser");
const mongoose        =  require("mongoose");
var camp              =  require("./models/schema");
var seedDB            =  require("./seeds");
const comments         =  require("./models/comments")
const uri = "mongodb+srv://nishanth:Siva@1999!.@yelpcamp.iex7v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



//Set app
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
console.log(__dirname);

//MongoDB Connection
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err){
        console.log("Error occured during Connecting the Database");
    }
    console.log("Database Connected");
    seedDB();
});




//Routes=> //GET-Req
app.get("/",(req,res)=>{
    res.render("landing.ejs");
});

app.get("/campground",(req,res)=>{    
    camp.find({},function(err,allcamp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds.ejs",{camp:allcamp});
        }
    });
});

app.get("/campground/new",(req,res)=>{
    res.render("new.ejs");
});


//POST-Req
app.post("/campground",(req,res)=>{
    var name = req.body.name;
    var url = req.body.url;
    var disc = req.body.disc;
    var newCamp = {name:name,url:url,disc:disc};
    camp.create(newCamp,function(err,newly){
        if(err){
            console.log(err);
        }else{
            console.log(newly);
            console.log("Item added to the DB");
            res.redirect("/campground");
        }
    });
});

//Show
app.get("/campground/:id",(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs",{camp:foundCamp});
            console.log(foundCamp);
        }
    });
   
});

//=============================================================================================================================//

app.get("/campground/:id/comments/new",(req,res)=>{
    camp.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log(err);
        } else{
            res.render("camp_cmts_new",{camp:camp});
        }
    })
    
});

app.post("/campground/:id/comments",(req,res)=>{
   camp.findById(req.params.id,(err,camp)=>{       
        if(err){
            console.log(err);
        } else{
            comments.create(req.body.comment,(err,cmt_added)=>{
                if(err){
                    console.log(err);
                } else{
                    
                    camp.comments.push(cmt_added);
                    camp.save();
                    res.redirect("/campground/"+req.params.id);
                    console.log(cmt_added);
                    
                }
            });
        }
   });
});


//=============================================================================================================================//




app.get("/rajkumar",function(req,res){
   res.send("Welcome to Reaj site"); 
});

//Port
app.listen(3000,(req,res)=>{
    console.log("Server Connected");
});
