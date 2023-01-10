const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require('node:https');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName,
            }
        } 
    ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/669f3f0b76"

    const options = {
        method: "POST",
        auth: "puneeeeeeet:a361ec93689461c12db59a32f5c33e89-us10"
    }
    const request = https.request(url, options, function(response){
        console.log('response',response)
        if(response.statusCode===200){
            res.sendFile(__dirname+ "/success.html")
        }else{ 
            res.sendFile(__dirname+ "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
   
});   

app.post("/failure",function(req,res){
    res.redirect("/")
});

app.listen(3000,function(){
    console.log("server working on port 3000");
})

// process.env.PORT || 






// api key
// 67847f369b7f702c92e076e8d3154be4-us10

// api 2nd
// a361ec93689461c12db59a32f5c33e89-us10

// list id // audience id
// 669f3f0b76
// 669f3f0b76

//https://<dc>.api.mailchimp.com/3.0/
