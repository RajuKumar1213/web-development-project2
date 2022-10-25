const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const _ = require("lodash");

let posts = [];

const homeStartingContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undo is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..";

const aboutStartingText = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.";

const contactStartingText = " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specim.";

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/" , (req, res)=>{
    res.render("home" , {
        homeText : homeStartingContent,
        posts: posts
    });

    
    // console.log(posts);
})

app.get ("/about" , function(req, res){
    res.render("about" ,{aboutText : aboutStartingText} );
})

app.get ("/contact" , function(req, res){
    res.render("contact" ,{contactText : contactStartingText} );
})

app.get("/compose" , function(req , res){
    res.render("compose");
})

app.post("/compose", function(req, res){
    const post = {
        title :req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(post);
    
    res.redirect("/");

   
})

app.get("/posts/:postName" , (req, res)=>{
    const requestedTitle =_.lowerCase(req.params.postName);
 
   
    posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);
        if( requestedTitle === storedTitle){
            res.render("post", {
                title : post.title,
                content: post.content
            })
        }
       
    })

})

app.listen(3000 , ()=>{
    console.log("Your server is runnig at port 3000");
})
