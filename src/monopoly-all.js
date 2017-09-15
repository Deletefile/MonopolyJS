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
