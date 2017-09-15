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
checkPlayersNumber = function(n){
  if(n>= 2 && n<=8){
    return true;
  }else{
    return false;
  }
}

playGame = function(number){
  var numPlayers = number;
  if(checkPlayersNumber(numPlayers) == true){
    //if(numPlayers>=2 && numPlayers<=8){
      monopoly = new Monopoly(20,numPlayers);
      monopoly.setPlayers();
      var k = 1;
      playRound(k);
    }else{
      alert("Set a number between 2 and 8.");
      document.getElementById("pl").innerHTML = "";
    }
}

playRound = function(asd){
  var k = asd;

    if (k<=20){
      document.getElementById("second_div").innerHTML = "["+k+"] Round<br>";
        for(var i=1; i<=monopoly.players; i++){
          monopoly.rollDice();
          monopoly.movePlayer(i);
          var div_square = "square"+monopoly.player[i].getPlayerPos();
          var div_player = "player"+i;
          movePos(div_player,div_square);
          document.getElementById("second_div").innerHTML += "("+monopoly.player[i].name+") lancia i due dadi e fa "+monopoly.total+": si sposta nella casella = "+monopoly.player[i].pos+"<br>";
          monopoly.resetDice();
          monopoly.player[i].setTotalRounds(monopoly.player[i].totalRounds+1);
        }
      k++;
      document.getElementById("second_div").innerHTML += "<input type='button' value='Next' onclick='playRound("+k+")' />";
  }else{
    alert("Finiti i 20 turni");
    var max=0;
    var id=0;
    for(var i=1; i<=monopoly.players; i++){
      if (monopoly.player[i].money>=max){
        max = monopoly.player[i].money;
        id = i;
      }
    }
    alert("Il vincitore è "+monopoly.player[id].name+" che ha €"+monopoly.player[id].money);
  }
}

swapDiv = function(first_div,second_div){
  d1 = document.getElementById(first_div);
  d2 = document.getElementById(second_div);
    if( d2.style.display == "none" ){
      d1.style.display = "none";
      d2.style.display = "block";
    }else{
      d1.style.display = "block";
      d2.style.display = "none";
    }
}

generateTextBoxes = function() {
    var a = parseInt(document.getElementById("n_players").value);
      for (i = 1; i <= a; i++) {
        var texte = "Player "+i+" <input type='text' style='width: 70px;' id='player_name"+i+"'/> Color <input type='text' style='width: 70px;' id='player_color"+i+"'/><br>";
        document.getElementById("pl").innerHTML += texte;
      }
        document.getElementById("pl").innerHTML += "<input type='button' value='Play' onclick='playGame("+a+")'>";
    }

movePos = function(playerDiv, squareDiv){
    var player      = document.getElementById(playerDiv);
    var lastSquare  = document.getElementById(player.parentNode.id);
    var nextSquare  = document.getElementById(squareDiv);
    var playerCopy  = player.cloneNode(true);
    lastSquare.removeChild(player);
    nextSquare.append(playerCopy);
}
