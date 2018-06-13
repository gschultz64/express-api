var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /players - returns all players
app.get('/players', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  res.json(players);
});

app.listen(3000);