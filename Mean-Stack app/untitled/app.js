var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist' , ['contactlist']);
var bodyParser = require('body-parser');

//static means all the html and css files. These files are known as static files

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/contactlist' , function (req,res) {
  console.log("I received a GET request");
    db.contactlist.find(function (err,data) {

    console.log(data);
    res.json(data);

  });

});
//app.post listens to te post request from the controller
//console log will just print the data to the command prompt
//just to check whether we are getting the data
app.post('/contactlist' , function (req, res) {

    console.log(req.body);
    //the first line inserts the data to the mongoDB
    //the second line gets the same data and sends it to the
    //controller.js file so that we can print it
    //on the UI
    db.contactlist.insert(req.body, function (err,data) {
        res.json(data);

    });

});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err,data) {
        res.json(data);

    });

});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err,data) {
        res.json(data);

    });

});

app.put('/contactlist/:id' , function (req,res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new : true}, function (err,data) {

        res.json(data);

    });



    });

 app.listen(3000);
 console.log("Server running on port 3000");