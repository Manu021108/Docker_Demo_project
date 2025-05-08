let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// Corrected MongoDB connection URLs
let mongoUrlLocal = "mongodb://admin:password@localhost:27018"; // For local environment
let mongoUrlDocker = "mongodb://admin:pass@mongodb"; // For Docker container

// Database name
let databaseName = "my-db";

// POST endpoint to update the user profile
app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  // Use MongoDB connection string for local
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, { upsert: true }, function(err, result) {
      if (err) throw err;
      client.close();
      // Send response after updating the profile
      res.send(userObj);
    });
  });
});

// GET endpoint to fetch the user profile
app.get('/get-profile', function (req, res) {
  let response = {};

  // Connect to the db using the local MongoDB connection string
  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response with the user profile or empty object
      res.send(response ? response : {});
    });
  });
});

// Start the server
app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
