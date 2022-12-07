const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over,
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//declare global variables for both cards being flipped and that they start out as unflipped
let hasFlippedCard = false;
let firstCard;
let secondCard;
noClicking = false;


// TODO: Implement this function!
function handleCardClick(event) {
// if no clicking = true then return and dont run the function
  if (noClicking) return;
  //set event target to a variable to make it easier to read
  let clickedCard = event.target
  //if the classlist of the card clicked contains flip then we exit the function here
  if (clickedCard.classList.contains('flip')) return;
  //set background color to match the class name when clicked, use the first class because we toggle the second class to create the flip effect
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  //add the class 'flip' to the class list 
  clickedCard.classList.add('flip');
  //if card hasflippedcard variable is still false we change it to true and we assign firstcard to the clickedcard
  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = clickedCard;
  //when we click again we will fail the first part of the if statement and run the else section where we now set
  //set hasflipped to false and assign the second card to the clickedcard we just clicked on
  } else {  
  hasFlippedCard = false;
  secondCard = clickedCard;
  //set no clicking to true so that if another card is clicked after the second card this function wont run on that card
  noClicking = true;
//check if class names match on both cards that have been clicked consecutively, 
//if htey have we will remove the event handler which will take them out of this funcation at this point
if (firstCard.className === secondCard.className){
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
  //set noclicking to false to allow the function to run again after a match is found
  noClicking = false;
} else {
  //if they dont match we will move on to this timeout section that after 1000ms 
  //changes the background color to an empty string, adds 'flip' back to the classlist and 
  //sets both clicked cards null so it is able to be reassigned to the next clickedcard
  setTimeout(()=>{
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
    noClicking = false;
  },1000)
}
}
}

// when the DOM loads
createDivsForColors(shuffledColors);
