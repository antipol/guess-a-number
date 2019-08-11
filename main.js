//GUESSING GAME - guess a num between 0 and 10

/*
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  //Both max and min are included
}

const guessingGame = () => {
  //create a num to guess beetween 0 anf 10
  let numberToGuess = getRandomIntInclusive(0, 10);

  let count = 1;

  //make first guess
  let guess = parseInt(prompt('Guess a number between 0 and 10. You have 3 attempts'));

  //As long as the guess is incorrect and you have tried to guess less than 3 times, try to guess again

  while (guess != numberToGuess && count < 3) {

    if (isNaN(guess)) {
      guess = parseInt(prompt('No, not a number'));
    } else {
      guess = parseInt(prompt(`Wrong, try aggain, you have ${3 - count} attempts left`))
      count++;
    }
  }

  if (guess == numberToGuess && count < 3) {
    alert(`Succes, the number is ${numberToGuess}. You got it after ${count} attempts.`)
  } else {
    alert(`Sorry, you didnt't guess that the number was ${numberToGuess} in your three attempts`)
  }
}

guessingGame()

*/




//MY VERSION

//Start screen, pick a level:

//set initial level to 0, 0
let min = 0;
let max = 0;

let numberToGuess;


//get random number
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


const guessingGame = (min, max) => {
  //get random number to guess
  numberToGuess = getRandomNum(min, max);

  return numberToGuess;
}


const startContainer = document.querySelector(".start-container");
const levelContainer = document.querySelector(".levels");
const gameContainer = document.querySelector(".game-container");

//set the min and max according to choice of level
const pickLevel = e => {
  if (e.target && e.target.id === "level1") {
    min = 1;
    max = 10;
    e.target.style.fontSize = "8em";
    document.getElementById("level2").style.fontSize = "4em";
    document.getElementById("level3").style.fontSize = "4em";
  }
  if (e.target && e.target.id === "level2") {
    min = 1;
    max = 100
    e.target.style.fontSize = "8em";
    document.getElementById("level1").style.fontSize = "4em";
    document.getElementById("level3").style.fontSize = "4em";
  }
  if (e.target && e.target.id === "level3") {
    min = 1;
    max = 1000;
    e.target.style.fontSize = "8em";
    document.getElementById("level2").style.fontSize = "4em";
    document.getElementById("level1").style.fontSize = "4em";
  }
  numberToGuess = guessingGame(min, max)
}

levelContainer.addEventListener("click", pickLevel);



//Play button event, intro/level screen
const playButton = document.querySelector(".play .play-button");

const startGame = e => {
  if (min === 0 && max === 0) {
    //show message if no level was chosen
    const showLevelMsg = document.querySelector(".pick-level-msg");
    showLevelMsg.style.opacity = "1";
    showLevelMsg.style.zIndex = "1";

    //to close message
    const okayButton = showLevelMsg.querySelector("button");
    const okay = e => {
    showLevelMsg.style.opacity = "0";
    showLevelMsg.style.zIndex = "-1";
    }
    okayButton.addEventListener("click", okay);
  } else {
    startContainer.style.display = "none";
    gameContainer.style.display = "grid";
  }
  console.log(numberToGuess);
}

playButton.addEventListener("click", startGame);




//Second / game screen

//back button + home button (msg screen)
const backButton = document.querySelector(".nav-bar").firstElementChild;
const homeButton = document.querySelector(".msg-background .home");

const homeRefresh = e => {
  document.location.reload();
}

backButton.addEventListener("click", homeRefresh);
homeButton.addEventListener("click", homeRefresh);




let guessingArray = [];
const triesLeft = document.querySelector(".status-bar .tries-left-fill");

const guessedNumsArray = [];
const guessedNums = document.querySelectorAll(".guesses p")
const guesses = document.querySelector(".guesses");

const display = document.getElementById("guessingNum");
const range = document.querySelector(".range");

const keyboardNums = document.querySelector(".keyboard");

const msgBackground = document.querySelector(".toggle-msg");
const msgContainer = document.querySelector(".toggle-msg .msg-container");
const guessedNumContainer = msgContainer.querySelector("p");


//display which range the secret number is in
const showRange = e => {
  range.innerHTML = `${min} to ${max}`;
}

playButton.addEventListener("click", showRange);



const numButtons = e => {

  if (e.target && e.target.id === "delete") {

    //if delete button is pressed, delete last digit in guessingArray
    guessingArray.pop();

  } else if (e.target && e.target.id === "guess") {

    //if guess button is pressed, push the num to be guessed to the guessedNumsArray
    guessedNumsArray.push(guessingArray.join(""));
    display.innerHTML = guessingArray.join("");

    //update p with the guessed number
    for (let i = 0; i < guessedNumsArray.length; i++) {
      guessedNums[i].innerHTML = guessedNumsArray[i];

    }

    //for each try, subtract a life in the status bar
    triesLeft.style.gridColumn = `1 / ${4 - guessedNumsArray.length}`;
    triesLeft.style.borderRadius = "15px 0 0 15px";

    //if guess is correct
    if (Number(guessingArray.join("")) === numberToGuess) {
      msgContainer.firstElementChild.innerHTML = "you won!";
      guessedNumContainer.lastElementChild.innerHTML = `${numberToGuess} is indeed the correct number.`;
      msgContainer.style.backgroundColor = "turquoise";
      msgBackground.style.opacity = "1";
      msgBackground.style.zIndex = "1";
    }

    //if all three guesses has been used and number is not guessed, show game over msg
    if (guessedNumsArray.length === 3 && Number(guessingArray.join("")) !== numberToGuess) {
      triesLeft.style.gridColumn = "-1"
      msgContainer.firstElementChild.innerHTML = "game over!";
      guessedNumContainer.firstElementChild.innerHTML = "";
      guessedNumContainer.lastElementChild.innerHTML = `you lost! the correct number was ${numberToGuess}`;
      document.querySelector(".toggle-msg").style.opacity = "1";
      document.querySelector(".toggle-msg").style.zIndex = "1";
    }

    //if guess is wrong, but attempts is less than 3
    //don't know yet, message across the scsreen?

    //reset display when guess has been pressed
    guessingArray.splice(0);



  } else if (e.target && e.target.tagName === "BUTTON") {
    //if keyboard button with number is pressed, push that number to the guessingArray
    guessingArray.push(e.target.innerHTML);
  }

  //update the display every time a button is clicked
  display.innerHTML = guessingArray.join("");

}

keyboardNums.addEventListener("click", numButtons);




//play again buttons
const startOverButton = document.querySelector(".nav-bar .start-over");
const playAgainButton = document.querySelector(".msg-background .try-again");

const playAgain = e => {
  //on click, hide play again message
  msgBackground.style.zIndex = "-1";
  msgBackground.style.opacity = "0";

  // reset tries left to full
  triesLeft.style.gridColumn = "1 / 4";
  triesLeft.style.borderRadius = "15px";

  //reset display screen
  display.innerHTML = "";

  //reset number entered into display
  guessingArray.length = 0;

  for (let i = 0; i < guessedNumsArray.length; i++) {
    //reset all guesses
    guessedNums[i].innerHTML = " ";
  }

  //reset number that have been guessed
  guessedNumsArray.splice(0);

  //generate new number to guess
  guessingGame(min, max);

  console.log(numberToGuess);
}

startOverButton.addEventListener("click", playAgain);
playAgainButton.addEventListener("click", playAgain);

















//