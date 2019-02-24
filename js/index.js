var game = {
  userInput: 0,
  gameArray: [],
  userInputLevel: 0,
  gameLevel: 0,
  allowUserInput: false,
  strict: false,
  colors: ['#c1','#c2','#c3','#c4'],
  sound:{
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
};

var gameOver = function(){
  $(".head h1").text("Game Over :(");
  game.allowUserInput = false;
}
var clickAnimation = function(id){
  $(game.colors[id-1]).animate({opacity:'0.3'},350,function(){
    $(game.colors[id-1]).animate({opacity:'1.0'},350);
  });
}
var showMove = function(){
  var sh_moves = 0;
  var mov = setInterval(showMoves,1000);
  function showMoves(){
    if(sh_moves < game.gameLevel){
      clickAnimation(game.gameArray[sh_moves]);
      sh_moves++;
    } else if(sh_moves == game.gameLevel){
      clearInterval(mov);
      game.allowUserInput = true;
    }
  }
};
var clearUserI = function(){
  game.userInputLevel = 0;
  game.allowUserInput = false;
};
var updateLevel = function(){
  $(".curr-level").text(game.gameLevel);
}
var goGame = function(){
  clearUserI();
  game.gameLevel++;
  updateLevel();
  game.gameArray.push(((Math.floor((Math.random()*1000)+1))%4)+1);
  showMove();
};
var startGame = function(){
  $("#start-btn").html("Reset");
  goGame();
};
var resetGame = function(){
  $("#start-btn").html("Start");
  $(".head h1").text("Simon Game");
  game.gameArray = [];
  game.gameLevel = 0;
};
var gameWin = function(){
  game.allowUserInput = false;
  $(".head h1").text("You Win !!!");
}
var toggleStrict = function(){
  if(game.strict){
    game.strict = false;
    $("#strict-toggle").removeClass('btn-warning');
    $("#strict-toggle").addClass('btn-dark');
  } else {
    game.strict = true;
    $("#strict-toggle").removeClass('btn-dark');
    $("#strict-toggle").addClass('btn-warning');
  }
};
var userInputCheck = function(){  
  if(game.gameArray[game.userInputLevel] === game.userInput){
    game.userInputLevel++;
    if(game.userInputLevel == 20){
      gameWin();
      return true;
    }
    if(game.userInputLevel == game.gameLevel){
      goGame();
    }
      
  } else {
    if(game.strict)
      gameOver();
    else{
      if(game.gameLevel > 1){
        game.gameLevel--;
        console.log('here');
        goGame();
      } else {
        gameOver();
      }
    }
  }
};
var colorClick = function(id){
  return function(){
    if(true){
      clickAnimation(id);
      game.userInput = id;
      $(document).trigger('input_check');
    }
  };
};
$(document).ready(function(){
  $("#start-btn").on('click',function(){
    ($("#start-btn").text() == "Start") ? startGame() : resetGame();
  });
  $("#strict-toggle").on('click',toggleStrict);
  $(document).bind('input_check',userInputCheck);
  for(var i = 1;i<5;i++){
    $("#c"+i).on("click",colorClick(i));
  }
});