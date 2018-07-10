const mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  position: String
});

playerSchema.methods.listPlayers = function () {
  return "<ul><li>" + this.name + " plays " + this.position + "</li></ul>";
}

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;