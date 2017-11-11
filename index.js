var express  = require("express");
var app = express();
var path = require('path');
var contacts_db = require("./seed.js");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var router = express.Router();


var multer = require('multer');
var url = 'mongodb://admin:admin@cluster0-shard-00-00-stfc6.mongodb.net:27017,cluster0-shard-00-01-stfc6.mongodb.net:27017,cluster0-shard-00-02-stfc6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//console.log(todos_db);
// app.use("/",function(req,res,next){
//     console.log("REQUEST");
//     console.log(req.url);
//     console.log(req.method);
//      next();
// });

app.use("/",express.static(__dirname+"/public"));

//use http methods put,get,delete,post for sturturing your file

//1.get all todos
// "/api/todos is an endpoint

app.use("/",bodyParser.urlencoded({extended : false}));

// app.get("/api/contacts",function(req,res){
//
//     res.json(contacts_db.contacts);
//
// });




app.use('/allContacts',function(req,res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        var collection = db.collection("contact");
        collection.find({}).toArray(function (err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
            res.send(data)
        })
        db.close();
    })
})







//var express = require('express');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname + '/upload'))
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

var upload = multer({ storage : storage});

app.use('/update',  upload.single('pic'), function(req,res){


    console.log("Server: got file ");
    console.log(req.file);
    var Pic=req.file;
    var upl = {picture: Pic};
    // upl.save(function(err,docs) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.json(docs);
    // });
});
//module.exports = router;











app.use('/submit', function(req , res) {
    MongoClient.connect(url, function (err, db) {
        console.log("Connected correctly to server");
        if (err) {
            throw err;
        }

        var Name = req.body.user.name;
        var MOBILE = req.body.user.MOBILE;

        console.log(MOBILE);
        if (!Name || Name == "" || Name.trim() == "") {
            res.status(400).json({error: "Name can't be empty"});
        }
        else {


            var collection = db.collection("contact");

            collection.insertOne({Name: Name, MOBILE: MOBILE},
                function (err, result) {
                    if (err)
                    {
                        throw err;
                    }
                    res.sendFile(__dirname + '/public/index.html');
                }
            )
        }
        db.close();

    });

});


    app.use('/edit', function(req , res)
    {
        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to server");
            if(err)
            {
                throw err;
            }

            var Name = req.body.user.name;
            var  MOBILE=req.body.user.MOBILE;

            console.log(MOBILE);
            if(!Name || Name=="" || Name.trim() == "")
            {
                res.status(400).json({error:"Name can't be empty"});
            }
            else
            {


                var collection = db.collection("contact");

                collection.updateOne({Name:Name}, { $set: { MOBILE:MOBILE } },
                    function (err, result) {
                        if (err)
                        {
                            throw err;
                        }
                        res.sendFile(__dirname+'/public/index.html');
                    }
                )
            }
            db.close();
            //start();
        });

    });

app.listen(3001);