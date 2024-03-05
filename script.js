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
  "purple",
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
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

colorsClicked = [];
matchesFound = 0;
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let color = event.target.getAttribute("class");
  event.target.style.background = color;
  event.target.classList.add("clicked");

  const clicked = gameContainer.querySelectorAll(".clicked");

  colorsClicked.push(color);

  if (colorsClicked.length === 2) {
    // remove and re-add listener to prevent clicking for 1 second
    const divs = gameContainer.querySelectorAll("div");
    for (const div of divs) {
      div.removeEventListener("click", handleCardClick);
      setTimeout(() => {
        for (const div of divs) {
          if (!div.className.includes("found")) {
            div.addEventListener("click", handleCardClick);
          }
        }
      }, 1000);
    }
    if (colorsClicked[0] !== colorsClicked[1]) {
      for (const element of clicked) {
        setTimeout(() => {
          element.style.background = "";
          element.classList.remove("clicked");
        }, 1000);
      }
      colorsClicked = [];
    } else {
      matchesFound++;
      for (const element of clicked) {
        element.classList.remove("clicked");
        element.classList.add("found");
        element.removeEventListener("click", handleCardClick);   
      }
      colorsClicked = [];
    }
  }
  if(matchesFound === 5) alert("You did it!")
}

// when the DOM loads
createDivsForColors(shuffledColors);
