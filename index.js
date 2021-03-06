var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
const Player = require('./models/player');

var app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));

// Mongoose Stuff
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/baseball');

// GET /players - returns all players
app.get('/players', (req, res) => {
  Player.find({}, function(err, player) {
    console.log(err);
    res.render('players/index', {player: player});
  })
});

// GET /players/new - returns the form for adding (CREATE)
app.get('/players/new', (req, res) => {
  res.render('players/new');
});

// POST /players - adds a new player
app.post('/players', (req, res) => {
  Player.create({name: req.body.name, position: req.body.position}, function(err, player) {
    console.log(err);
  });
  res.redirect('/players'); 
});

//GET /players/:id - gets one player
app.get('/players/:id', (req, res) => {
  Player.findById(req.params._id, function(err, player) {
    console.log(err);
    res.render('players/show', { player: req.params.id });
  })
});

// GET /players/:id/edit - returns the form for updating (UPDATE)
app.get('/players/:id/edit', function (req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  res.render('players/edit', {player: players[playerIndex], id: playerIndex});
});

//PUT /players/:id - updates one player
app.put('/players/:id', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  // players[playerIndex].name = req.body.name;
  // players[playerIndex].position = req.body.position;
  players.splice(playerIndex, 1, { name: req.body.name, position: req.body.position });
  fs.writeFileSync('./data.json', JSON.stringify(players));
  res.json(players);
});

//DELETE /players/:id - deletes one player
app.delete('/players/:id', function(req, res) {
  var players = fs.readFileSync('./data.json');
  players = JSON.parse(players);
  var playerIndex = req.params.id;
  players.splice(playerIndex, 1);
  fs.writeFileSync('./data.json', JSON.stringify(players));
  res.json(players);
});

app.listen(3000);