//class player
var Player = function(name, color, money){
  this.name   = name;
  this.color  = color;
  this.money  = money;
  this.pos    = 0;
  this.totalRounds = 0;

  this.setPlayerMoney = function(amount){
    this.money = amount
  }

  this.setPosition = function(position){
    this.pos = position;
  }
  this.setTotalRounds = function(round){
    this.totalRounds = round;
  }

  this.getPlayerColor = function(){
    alert(this.color);
  }

  this.getPlayerPos = function(){
    return this.pos;
  }
};
if (typeof exports !== 'undefined') {
 module.exports = Player;
}
