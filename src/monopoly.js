Monopoly = function(rounds,players){
  this.rounds   = rounds;
  this.players  = players;
  this.player   = [];
  this.dice1    = 0;
  this.dice2    = 0;
  this.rolled   = false;
  this.total     = 0;
  var num       = 0;

  this.setPlayers = function(){
    swapDiv('first_div','second_div');
    for(var i=1; i<=this.players; i++){
      var nameFromInput   = document.getElementById("player_name"+i).value;
      var colorFromInput  = document.getElementById("player_color"+i).value;
      this.player[i]  = new Player(nameFromInput, colorFromInput, 1500);
      //all players are set at GO by default "this.pos = 0;"
      document.getElementById("square0").innerHTML += "<div class='player' id='player"+i+"' style='background-color:"+monopoly.player[i].color+"; left: 0px; top: 0px;'></div>";
    }
    document.getElementById("second_div").innerHTML += "[*]Giocatori generati correttamente!<br>";
  }

  this.rollDice = function(){
    this.dice1  = Math.floor(Math.random() * 6) + 1;
    this.dice2  = Math.floor(Math.random() * 6) + 1;
    this.rolled = true;
    this.total = this.dice1+this.dice2;
  }

  this.resetDice  = function(){
    this.rolled   = false;
  }

  this.movePlayer = function(id){
    var i = id;
    num = this.player[i].getPlayerPos()+this.total;

      if(num>39){
        this.player[i].setPosition(this.player[i].getPlayerPos()+this.total-40);

        //give 200€ for pasing go or landing on go
        this.moneyToPlayer(200,i);
      }else{
        this.player[i].setPosition(this.player[i].getPlayerPos()+this.total);
    }
      if(this.player[i].getPlayerPos() == 30){
        //the player is in jail
        //so is sent to just Visiting
        this.player[i].setPosition(10);
      }
      if(this.player[i].getPlayerPos() == 4){
        //income TAX
        var itax = this.player[i].money*10/100;
          if(this.player[i].money != 0){
            if(itax < 200){
              this.moneyFromPlayer(itax,i);
            }else{
              this.moneyFromPlayer(200,i);
          }
        }
      }
      if(this.player[i].getPlayerPos() == 38){
        //luxury tax
        this.moneyFromPlayer(75,i);
      }
  }

  this.moneyToPlayer = function(amount,id){
    this.player[id].setPlayerMoney(this.player[id].money+amount);
  }

  this.moneyFromPlayer = function(amount,id){
    this.player[id].setPlayerMoney(this.player[id].money-amount);
  }

};
if (typeof exports !== 'undefined') {
 module.exports = Monopoly;
}
