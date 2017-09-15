var assert = chai.assert;
var expect = chai.expect;

describe('Monopoly Release1', function(){
  it("Create a Monopoly object with 5 players and 20 rounds", function() {
    var monopoly = new Monopoly(20,5);
      expect(monopoly.players).to.deep.equal(5);
      expect(monopoly.rounds).to.deep.equal(20);

  });
  it("Player on beginning location (numbered 0), rolls 7, ends up on location 7", function() {
    var monopoly = new Monopoly(20,5);
    monopoly.total = 7;
    monopoly.player[1]  = new Player("test", "blue", 1500);
    monopoly.movePlayer(1);
    var number = monopoly.player[1].getPlayerPos();
      expect(number).to.deep.equal(7);

  });
  it("Player on location numbered 39, rolls 6, ends up on location 5", function() {
    var monopoly = new Monopoly(20,5);
    monopoly.total = 6;
    monopoly.player[1]  = new Player("test", "blue", 1500);
    monopoly.player[1].setPosition(39);
    monopoly.movePlayer(1);
    var number = monopoly.player[1].getPlayerPos();
      expect(number).to.deep.equal(5);
  });

  it("Create a game with two players named Horse and Car.", function() {
    var monopoly = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    monopoly.player[2]  = new Player("Horse", "blue", 1500);
      expect(monopoly.player[1].name).to.deep.equal("Carl");
      expect(monopoly.player[2].name).to.deep.equal("Horse");
  });

  it("Try to create a game with < 2 or > 8 players. When attempting to play the game, it will fail.", function() {
    var nplayers_1 = checkPlayersNumber(1);
    var nplayers_9 = checkPlayersNumber(9);
    var nplayers_12 = checkPlayersNumber(12);
      expect(nplayers_1).to.be.false;
      expect(nplayers_9).to.be.false;
      expect(nplayers_12).to.be.false;
  });


  it("Create a game and play, verify that the total rounds was 20 and that each player played 20 rounds.", function() {
    var monopoly = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    monopoly.player[2]  = new Player("Horse", "blue", 1500);
      for(var k=1; k<=20; k++){
        for(var i=1; i<=monopoly.players; i++){
          monopoly.rollDice();
          monopoly.movePlayer(i);
          monopoly.resetDice();
          monopoly.player[i].setTotalRounds(monopoly.player[i].totalRounds+1);
        }
      }
      expect(monopoly.player[1].totalRounds).to.deep.equal(20);
      expect(monopoly.player[2].totalRounds).to.deep.equal(20);

  });

  it("Create a game and play, verify that in every round the order of the players remained the same.", function() {
    var check = "";
    var repeted_check = false
    var monopoly = new Monopoly(20,3);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    monopoly.player[2]  = new Player("Horse", "blue", 1500);
    monopoly.player[3]  = new Player("Peter", "blue", 1500);
      for(var k=1; k<=20; k++){
        for(var i=1; i<=monopoly.players; i++){
          monopoly.rollDice();
          monopoly.movePlayer(i);
          monopoly.resetDice();
          monopoly.player[i].setTotalRounds(monopoly.player[i].totalRounds+1);
          check += monopoly.player[i].name;
        }
        if(check == "CarlHorsePeter"){
          repeted_check = true;
          check = "";
        }
      }
      expect(repeted_check).to.be.true;

  });
});

describe('Monopoly Release2', function(){
  it("During a turn a Player lands on Go and their balance increases by $200.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(37);
      monopoly.total = 3;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(200);
  });

  it("During a turn a Player lands on some normal location and their balance does not change.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
      var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(5);
      monopoly.total = 3;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(0);
  });

  it("Player starts before Go near the end of the Board, rolls enough to pass Go. The Player's balance increases by $200.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(37);
      monopoly.total = 6;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(200);
  });

  it("Player starts on Go, takes a turn where the Player does not additionally land on or pass over Go. Their balance remains unchanged.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
      var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(0);
      monopoly.total = 3;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(0);
  });

  it("Player passes go twice during a turn. Their balance increases by $200 each time for a total change of $400.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(37);
      monopoly.total = 6;
      monopoly.movePlayer(1);
      monopoly.player[1].setPosition(37);
      monopoly.total = 6;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(400);
  });

  it("Player starts before Go To Jail, lands on Go To Jail, ends up on Just Visiting and their balance is unchanged.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(29);
      monopoly.total = 6;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(0);
  });

  it("Player starts before Go To Jail, rolls enough to pass over Go To Jail but not enough to land on or pass over go. Their balance is unchanged and they end up where the should based on what they rolled.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1500);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(29);
      monopoly.total = 3;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = after-before;
    expect(difference).to.deep.equal(0);
  });

  it("During a turn, a Player with an initial total worth of $1800 lands on Income Tax. The balance decreases by $180.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 1800);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(3);
      monopoly.total = 1;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(180);
  });

  it("During a turn, a Player with an initial total worth of $2200 lands on Income Tax. The balance decreases by $200.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 2200);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(3);
      monopoly.total = 1;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(200);
  });

  it("During a turn, a Player with an initial total worth of $0 lands on Income Tax. The balance decreases by $0.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 0);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(3);
      monopoly.total = 1;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(0);
  });

  it("During a turn, a Player with an initial total worth of $2000 lands on Income Tax. The balance decreases by $200.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 2000);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(3);
      monopoly.total = 1;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(200);
  });

  it("During a turn, a Player passes over Income Tax. Nothing happens.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 2000);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(3);
      monopoly.total = 2;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(0);
  });

  it("Player takes a turn and lands on Luxury tax. Their balance decreases by $75.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 2000);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(37);
      monopoly.total = 1;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(75);
  });

  it("Player passes Luxury Tax during a turn. Their balance is unchanged.", function() {
    var monopoly  = new Monopoly(20,2);
    monopoly.player[1]  = new Player("Carl", "blue", 2000);
    var before  = monopoly.player[1].money;
      monopoly.player[1].setPosition(37);
      monopoly.total = 2;
      monopoly.movePlayer(1);
      var after =  monopoly.player[1].money;
      var difference = before-after;
    expect(difference).to.deep.equal(0);
  });






});
