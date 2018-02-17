var mongoose = requre("mongoose");

module.exports = function(app) {
  // app is the express app //
  app.get("/", function(req, res) {
    res.json({ test: "test" });
  });
};

const express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
// set up mongoose and conncting to server
var mongoose = require("mongoose");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

mongoose.connect(
  "mongodb://k90armstrong:" +
    process.env.MONGONYTPASS +
    "@ds235778.mlab.com:35778/nytreact"
);
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Send every request to the React app
require("./api")(app);
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
