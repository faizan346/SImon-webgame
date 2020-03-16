// initilize variables
var storeStepColor = [];
var newStepColor = "";
var stepsCount = 0, level = 1;
var islost = true;
var checkColor = "";

// audio objects initialize
var blueAudio = new Audio('sounds/blue.mp3');
var greenAudio = new Audio('sounds/green.mp3');
var redAudio = new Audio('sounds/red.mp3');
var yellowAudio = new Audio('sounds/yellow.mp3');
var wrongAudio = new Audio('sounds/wrong.mp3');

// assigning listener to body
$(document).keypress(beginGame);
//resetting values, begin game
function beginGame () {
  if (islost) {
    stepsCount = 0;
    storeStepColor = [];
    level = 1;
    islost = false;
    nextLevelSetup();
  }
}

// assigning listener to buttons
$('.btn').click(clickOnButton);
// function target on click
function clickOnButton () {
  if (islost) {
    // if lost, lost level setup
    buttonClickAnimation($(this));
    lostLevelSetup();
  } else {
      // ongoing current level
     buttonClickAnimation($(this));
     checkColor = $(this).attr('id');
     if (checkColor === storeStepColor[stepsCount]) {
       stepsCount++;
     } else {
       islost = true;
       lostLevelSetup();
     }
  }
  if (stepsCount === storeStepColor.length && !islost) {
    // if level clear, next level setup
    setTimeout(function () {nextLevelSetup();}, 500);
  }
}

// button click animation
function buttonClickAnimation (button) {
  button.addClass('pressed');
  checkColor = button.attr('id');
  switch (checkColor) {
    case 'green':
      greenAudio.play();
      break;
    case 'red':
      redAudio.play();
      break;
    case 'yellow':
      yellowAudio.play();
      break;
    case 'blue':
      blueAudio.play();
      break;
    default:
  }
  setTimeout(function () {button.removeClass('pressed');}, 150);
}

// Level Setups
function nextLevelSetup() {
    $('#level-title').text('LEVEL - ' + level);
    newStepColor = randomColor();
    buttonClickAnimation($('.' + newStepColor));
    storeStepColor.push(newStepColor);
    level++;
    stepsCount = 0;
}
function lostLevelSetup () {
  $('body').addClass('game-over');
  $('h1').text('GAME-OVER!!!! Press any key to Play-Again');
  wrongAudio.play();
  setTimeout(function () {$('body').removeClass('game-over');}, 200);
}

// return random color from GRYB
function randomColor () {
  var i = Math.floor(Math.random() * 4) + 1;
  switch (i) {
    case 1:
      return 'green';
    case 2:
      return 'red';
    case 3:
      return 'yellow';
    case 4:
      return 'blue';
    default:
  }
}
