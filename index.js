var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(ejsLayouts);

// GET /players - returns all players
app.get('/players', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  res.json(players);
});

// POST /players - adds a new player
app.post('/players', function (req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  players.push({name: req.body.name, position: req.body.color});
  fs.writeFileSync('./data.json', JSON.stringify(players));
  res.json(players);
  console.log(req.body);  
});

// TODO:
//GET /players/:id - gets one player

//PUT /players/:id - updates one player

//DELETE /players/:id - deletes one player


app.listen(3000);