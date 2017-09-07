//class player
var Player = function(name, color, money){
  this.name   = name;
  this.color  = color;
  this.money  = money;
  this.pos    = 0;
  this.order  = 0;
  this.jail   = false;
  this.visit  = false;

  this.getPlayerName = function(){
    alert(this.name);
  }
  this.getPlayerMoney = function(){
    alert(this.money);
  }
  this.getPlayerColor = function(){
    alert(this.color);
  }
  this.getPlayerPos = function(){
    return  this.pos;
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
square[4]  = new Square(4,"City Tax");
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
square[32] = new Square(30,"North Carolina Avenue");
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

  this.setPlayers = function(){
    var player = [];
    for(var i=1; i<=players; i++){
      /*var nameFromInput   = document.getElementById("name").value;
      var colorFromInput  = document.getElementById("color").value;
      var moneyFromInput  = document.getElementById("money").value;*/
      var nameFromInput   = 89;
      var colorFromInput  = 89;
      var moneyFromInput  = 89;
		  player[i]  = new Player(nameFromInput, colorFromInput, moneyFromInput);
      console.log(player[i].pos);
      //sll players are set at GO by default "this.pos = 0;"
    }
  }
};
/*
  public void playGame(){
		for ( int i = 0; i < ROUNDS_TOTAL; i++ ){
			playRound();
		}
	}
posizionare pedina
<div class="player" id="player[i].name" style="background-color: blue; left: 0px; top: 0px;"></div>
*/
