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
  players.push({name: req.body.name, position: req.body.position});
  fs.writeFileSync('./data.json', JSON.stringify(players));
  res.json(players);
  console.log(req.body);  
});

//GET /players/:id - gets one player
app.get('/players/:id', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  if (playerIndex >= players.length) {
    console.log('that is not a player');
  } else {
    res.json(players[playerIndex]);
    console.log({ player: players[playerIndex] });
  }
});

//PUT /players/:id - updates one player
app.put('/players/:id', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  if (playerIndex >= players.length) {
    console.log('that is not a player');
  } else {
    players.splice(playerIndex, 1, { name: req.body.name, position: req.body.position });
    fs.writeFileSync('./data.json', JSON.stringify(players));
    res.send(players);
    console.log(req.body);
  }
});

//DELETE /players/:id - deletes one player
app.delete('/players/:id', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  if (playerIndex >= players.length) {
    console.log('that is not a player');
  } else {
    players.splice(playerIndex, 1);
    fs.writeFileSync('./data.json', JSON.stringify(players));
    res.send(players);
    console.log(req.body);
  }
});

app.listen(3000);