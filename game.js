var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Press any key to start
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//User choose colour
$(".btn").click(function() {
  //var userChosenColour = this.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSoud(userChosenColour);
  animatePress($(this));
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSoud(randomChosenColour);
  $("#level-title").text("Level " + level);
  level++;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSoud("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Reset variables
function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function playSoud(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  currentColour.addClass("pressed"); //  currentColour.fadeOut(100).fadeIn(100);
  setTimeout(function() {
    currentColour.removeClass("pressed");
  }, 100);
}
// var btns = document.querySelectorAll(".btn");
// var btnsLength = btns.length;
// for (var i = 0; i < btnsLength; i++) {
//   btns[i].addEventListener("click", clickButton);
// }
//

// $("#"+randomChosenColour).click(function(){
//   $("#"+randomChosenColour).fadeOut(10).fadeIn(10);
// });
