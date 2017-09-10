//class player
var Player = function(name, color, money){
  this.name   = name;
  this.color  = color;
  this.money  = money;
  this.pos    = 0;
  this.order  = 0;
  this.jail   = false;
  this.visit  = false;

  this.setPlayerMoney = function(amount){
    this.money = amount
  }
  this.setPosition = function(position){
    this.pos = position;
  }
  this.getPlayerColor = function(){
    alert(this.color);
  }
  this.getPlayerPos = function(){
    return this.pos;
  }
};
//class squares
var Square = function(id,name){
  this.id   = id;
  this.name = name;
};
var square = [];
square[0]  = new Square(0,"GO");
square[1]  = new Square(1,"Mediterranean Avenue");
square[2]  = new Square(2,"Community Chest");
square[3]  = new Square(3,"Baltic Avenue");
square[4]  = new Square(4,"Income Tax");
square[5]  = new Square(5,"Reading Railroad");
square[6]  = new Square(6,"Oriental Avenue");
square[7]  = new Square(7,"Chance");
square[8]  = new Square(8,"Vermont Avenue");
square[9]  = new Square(9,"Connecticut Avenue");
square[10] = new Square(10,"Just Visiting");
square[11] = new Square(11,"St. Charles Place");
square[12] = new Square(12,"Electric Company");
square[13] = new Square(13,"States Avenue");
square[14] = new Square(14,"Virginia Avenue");
square[15] = new Square(15,"Pennsylvania Railroad");
square[16] = new Square(16,"St. James Place");
square[17] = new Square(17,"Community Chest");
square[18] = new Square(18,"Tennessee Avenue");
square[19] = new Square(19,"New York Avenue");
square[20] = new Square(20,"Free Parking");
square[21] = new Square(21,"Kentucky Avenue");
square[22] = new Square(22,"Chance");
square[23] = new Square(23,"Indiana Avenue");
square[24] = new Square(24,"Illinois Avenue");
square[25] = new Square(25,"B&O Railroad");
square[26] = new Square(26,"Atlantic Avenue");
square[27] = new Square(27,"Ventnor Avenue");
square[28] = new Square(28,"Water Works");
square[29] = new Square(29,"Marvin Gardens");
square[30] = new Square(30,"Go to Jail");
square[31] = new Square(31,"Pacific Avenue");
square[32] = new Square(32,"North Carolina Avenue");
square[33] = new Square(33,"Community Chest");
square[34] = new Square(34,"Pennsylvania Avenue");
square[35] = new Square(35,"Short Line");
square[36] = new Square(36,"Chance");
square[37] = new Square(37,"Park Place");
square[38] = new Square(38,"LUXURY TAX");
square[39] = new Square(39,"Boardwalk");
//class monopoly
var Monopoly = function(rounds,players){
  this.bank     = 99999999999;
  this.rounds   = rounds;
  this.players  = players;
  this.player   = [];
  this.dice1    = 0;
  this.dice2    = 0;
  this.rolled   = false;
  var total     = 0;
  var num       = 0;
  this.setPlayers = function(){
    for(var i=1; i<=this.players; i++){
    /*var nameFromInput   = document.getElementById("name").value;
      var colorFromInput  = document.getElementById("color").value;
      var moneyFromInput  = document.getElementById("money").value;*/
      var nameFromInput   = 89;
      var colorFromInput  = 89;
      var moneyFromInput  = 89;
		  this.player[i]  = new Player(nameFromInput, colorFromInput, moneyFromInput);
      //all players are set at GO by default "this.pos = 0;"
    }
    console.log("[*]Giocatori generati correttamente!");
  }
  this.rollDice = function(){

    this.dice1  = Math.floor(Math.random() * 6) + 1;
    this.dice2  = Math.floor(Math.random() * 6) + 1;
    this.rolled = true;
    total = this.dice1+this.dice2;
    return total;
  }
  this.resetDice  = function(){
    this.rolled   = false;
  }
  this.movePlayer = function(id){
    var i = id;
    num = this.player[i].getPlayerPos()+total;
      if(num>=39){
        this.player[i].setPosition(this.player[i].getPlayerPos()+total-39);
        //give 200€ for pasing go or landing on go
        this.moneyToPlayer(200,i);
        console.log(i+")"+this.player[i].pos);
      }else{
        this.player[i].setPosition(this.player[i].getPlayerPos()+total);
      console.log(i+")"+this.player[i].pos);
    }
      if(this.player[i].getPlayerPos() == 30){
        //the player is in jail
        //so is sent to just Visiting
        this.player[i].setPosition(10);
      }
      if(this.player[i].getPlayerPos() == 4){
        //income TAX
        if(this.player[i].money*20/100 < 200){
          this.moneyFromPlayer(this.player[i].money*20/100,i);
        }else{
          this.moneyFromPlayer(200,i);
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
playRound = function(){
  var numPlayers = 5;
    if(numPlayers>=2 && numPlayers<=8){
      monopoly = new Monopoly(20,numPlayers);
      console.log("[*]Genero "+monopoly.players+" giocatori.");
      console.log("[*]Setto i giocatori.");
      monopoly.setPlayers();

      for(var k=1; k<=monopoly.rounds;k++){
        console.log("["+k+" Round]");

          for(var i=1; i<=monopoly.players; i++){
            monopoly.rollDice();
            monopoly.movePlayer(i);
            monopoly.resetDice();
          }
      }
    }else{
      console.log("Set a number between 2 and 8.");
    }
}

/*
posizionare pedina
<div class="player" id="this.player[i].name" style="background-color: blue; left: 0px; top: 0px;"></div>




function incrementValue() {
var value = 1;
  value++;
  document.getElementById('number').value = value;
  if (value <= 10) {
    document.getElementById('coso').innerHTML += "test<br>";
  }
}

*/
