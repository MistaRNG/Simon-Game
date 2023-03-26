var userClickedPattern = []

var gamePattern = []

var buttonColors = ["red", "blue", "green", "yellow"]

var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  clickCounter = 0;
}

var clickCounter = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  clickCounter++;
  checkAnswer(clickCounter);

})

function playSound(name){

  var clickSound = new Audio ("sounds/" + name + ".mp3");
  clickSound.play();
  animatePress(name);

}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

 $(document).one("keydown", function(){
   nextSequence();
 })

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1] && userClickedPattern.length === gamePattern.length){
       setTimeout(function(){
         nextSequence();
      }, 1000);
}
  if (userClickedPattern[currentLevel-1] != gamePattern[currentLevel-1]) {
    var wrongSound = new Audio ("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document).keydown(function(){
      startOver()});

    }
}

function startOver(){
  location.reload();
}
