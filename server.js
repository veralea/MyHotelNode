const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// var babel = require("babel-core");
// import { transform } from 'babel-core';
// import * as babel from 'babel-core';
const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:27017/";
const url = "mongodb://myhotel-6135:hADQyz2IEY8gWmSsDD7FAl7atAJmcp@db-myhotel-6135.nodechef.com:5422/myhotel";
// import * as db from './utils/DataBaseUtils.js';


// db.setUpConnection();
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use(cors());

 app.get('/', (req, res) => {
    res.send('Hello from node server!');
 });




MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
 
    var rooms = [
      { number: "101", status: "1", floor: "1", guestName: "Helen", dateEntry: new Date("2019-01-25T16:00:00Z"), dateExit: new Date("2019-01-31T16:00:00Z") },
      { number: "103", status: "2", floor: "1", guestName: "John", dateEntry: new Date("2019-02-01T16:00:00Z"), dateExit: new Date("2019-02-03T16:00:00Z") },
      { number: "104", status: "1", floor: "1", guestName: "Rebekka", dateEntry: new Date("2019-02-03T16:00:00Z"), dateExit: new Date("2019-02-05T16:00:00Z") },
      { number: "106", status: "2", floor: "1", guestName: "Natali", dateEntry: new Date("2019-02-01T16:00:00Z"), dateExit: new Date("2019-02-25T16:00:00Z") },
      { number: "206", status: "2", floor: "2", guestName: "Leah", dateEntry: new Date("2019-02-11T16:00:00Z"), dateExit: new Date("2019-02-13T16:00:00Z") },
      { number: "304", status: "1", floor: "3", guestName: "Rebekka", dateEntry: new Date("2019-02-08T16:00:00Z"), dateExit: new Date("2019-02-14T16:00:00Z") },
      { number: "306", status: "2", floor: "3", guestName: "Leah", dateEntry: new Date("2019-02-10T16:00:00Z"), dateExit: new Date("2019-02-15T16:00:00Z") }
  ];
 
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myhotel");
    dbo.createCollection("rooms", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
     });     
     dbo.collection("rooms").insertMany(rooms, function(err, res) {
           if (err) throw err;
           console.log("Number of documents inserted: " + res.insertedCount);
           db.close();
       });
});

 
  app.get('/fetch', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myhotel");
        dbo.collection("rooms").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          console.dir(result);
          db.close();
        });
      }); 
  })

  app.get('/fetch/:floor', (req, res) => {
    const floor = req.params.floor;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myhotel");
        dbo.collection("rooms").find({floor: floor}).toArray(function(err, result) {
          if (err) throw err;
          res.send(result)
          console.dir(result);
          db.close();
        });
      }); 
  })

 app.put('/updateroom/:number/:status', (req, res)=>{
   const number = req.params.number.toString();
   const status = req.params.status.toString();
  MongoClient.connect(url,  {useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myhotel");
    var myquery = { number: number };
    var newvalues = { $set: {status: status } };
    dbo.collection("rooms").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      res.send(result);
      db.close();
    });
  });
 })

 app.put('/neworder/:number/:guestName/:dateEntry/:dateExit', (req, res)=>{
  const number = req.params.number.toString();
  const guestName = req.params.guestName.toString();
  const dateEntry = new Date(req.params.dateEntry);
  const dateExit = new Date(req.params.dateExit);
 MongoClient.connect(url,  {useNewUrlParser: true }, function(err, db) {
   if (err) throw err;
   var dbo = db.db("myhotel");
   var myquery = { number: number };
   var newvalues = { $set: {guestName: guestName, dateEntry: dateEntry, dateExit: dateExit } };
   dbo.collection("rooms").updateOne(myquery, newvalues, function(err, result) {
     if (err) throw err;
     console.log("1 document updated");
     res.send(result);
     db.close();
   });
 });
})

 var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

 let port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Server listen on port', port)
})
