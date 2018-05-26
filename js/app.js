/*
  Create a array of  list that holds all of  cards object
  */
let list = [{
    id: "first-diamond-card",
    cardClass: "fa fa-diamond",
    cardName: "diamond"
  }, {
    id: "first-paper-plane-card",
    cardClass: "fa fa-paper-plane-o",
    cardName: "paper-plane"
  },
  {
    id: "first-anchor-card",
    cardClass: "fa fa-anchor",
    cardName: "anchor"
  }, {
    id: "first-bolt-card",
    cardClass: "fa fa-bolt",
    cardName: "bolt"
  }, {
    id: "first-cube-card",
    cardClass: "fa fa-cube",
    cardName: "cube"
  }, {
    id: "second-anchor-card",
    cardClass: "fa fa-anchor",
    cardName: "anchor"
  }, {
    id: "first-leaf-card",
    cardClass: "fa fa-leaf",
    cardName: "leaf"
  },
  {
    id: "first-bicycle-card",
    cardClass: "fa fa-bicycle",
    cardName: "bicycle"
  }, {
    id: "second-diamond-card",
    cardClass: "fa fa-diamond",
    cardName: "diamond"
  },
  {
    id: "first-bomb-card",
    cardClass: "fa fa-bomb",
    cardName: "bomb"
  }, {
    id: "second-leaf-card",
    cardClass: "fa fa-leaf",
    cardName: "leaf"
  },
  {
    id: "second-bomb-card",
    cardClass: "fa fa-bomb",
    cardName: "bomb"
  }, {
    id: "second-bolt-card",
    cardClass: "fa fa-bolt",
    cardName: "bolt"
  },
  {
    id: "second-bicycle-card",
    cardClass: "fa fa-bicycle",
    cardName: "bicycle"
  }, {
    id: "second-paper-plane-card",
    cardClass: "fa fa-paper-plane-o",
    cardName: "paper-plane"
  }, {
    id: "second-cube-card",
    cardClass: "fa fa-cube",
    cardName: "cube"
  }
];

list = shuffle(list);

// shuffle the list of cards using the "shuffle" method below
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const restart = document.querySelector(".restart");
const playAgain = document.querySelector(".play-again");
// restart.addEventListener("click", restartGame);

restart.onclick = restartGame;


// restart the game
function restartGame() {
  console.log("im working");
  deck.innerHTML = "";
  list = shuffle(list);
  createElements();
  addEvents();
  seconds = 0;
  min = 0;
  totalMin = 0;
  count = 0;
  moveNumber = 0;
  document.getElementById("no-moves").innerHTML = moveNumber;
  let starTwo = document.getElementById("star-two");
  let starThree = document.getElementById("star-three");
  addRemoveClasses(starTwo, "fa-star", "fa-star-o");
  addRemoveClasses(starThree, "fa-star", "fa-star-o");
  correctElements = [];
  GameTimer();

  // GameTimer();
};


//this function is used to loop through each card and create its HTML and add each card's HTML to the page
createElements();

function createElements() {
  const deck = document.getElementById("deck"); // Get the <ul> element in the document
  for (let i = 0; i < 16; i++) {
    let id = list[i].id;
    let cardName = list[i].cardName;
    let cardClass = list[i].cardClass;
    let li = document.createElement("li");
    let icon = document.createElement("i");
    let liId = li.setAttribute("id", id); // Create a "id" attribute
    let liClass = li.setAttribute("class", "card"); // Create a "class" attribute
    let liName = li.setAttribute("name", cardName); // Create a "name" attribute
    let IconClass = icon.setAttribute("class", cardClass); // Create a "class" attribute
    li.appendChild(icon); //append the i element to li element
    deck.appendChild(li); //append the li element to ul element

  }
};

playAgain.onclick = function() {
  document.getElementById("model").style.display = "none";
  restartGame();

};
// this function is used to pass the value of 'event' and refrence to remove
// the addEventListener after clicking on the card
let events = function(e) {
  listener(e.target);
};

// this function is used to iterate through the list array and add
// addEventListener to each element on click event
addEvents();

function addEvents() {
  for (let i = 0; i < list.length; i++) {
    document.getElementById(list[i].id).addEventListener("click", events, false);
  }
};


function removeEvents() {
  for (let i = 0; i < list.length; i++) {
    document.getElementById(list[i].id).removeEventListener("click", events, false);
  }
}
//this function is used to remove Events Listener
function listener(thisCard) {
  let thisElement = thisCard.getAttribute("name");

  thisCard.removeEventListener("click", events, false);

  mainCards(thisCard, thisElement);
};



// after adding Events Listener to the list array this function will be called to call 2 functions
// displayCards and listOfOpenedCard
function mainCards(that, element) {
  displayCards(that);
  listOfOpenedCard(that, element)
};

function displayCards(that) {
  that.classList.add("show", "open");
};

let OcardList = [];
let correctElements = [];

function listOfOpenedCard(that, opencard) {
  let openCards = {
    fliped: opencard,
    thatcard: that
  };

  if (OcardList.length < 2) {
    OcardList.push(openCards);
  };

  if (OcardList.length === 2) {
    document.removeEventListener("click", events, false);
    matchCards(OcardList[0], OcardList[1]);
    removeEvents();
    let moveNumber;
    moveNumber = moveCounter();

    document.getElementById("no-moves").innerHTML = moveNumber;

    moveNumber === 12 ? emptyStars("star-three") : moveNumber === 16 ? emptyStars("star-two") : undefined;

    function emptyStars(starNo) {
      let star = document.getElementById(starNo);
      addRemoveClasses(star, "fa-star-o", "fa-star");
    };
  };
};


//this function is used to  increment the move counter and display it on the page
let count = 0;

function moveCounter() {
  count += 1;
  return count;
};

// this function is used to add class and remove another class
function addRemoveClasses(element, add, remove) {

  (element).classList.add(add);
  (element).classList.remove(remove);
};

//this function is used to  check to see if the two cards match
function matchCards(first, second) {
  if (first.fliped === second.fliped) {
    //if two card match the addRemoveClasses to add match class and remove open class to opend cards
    addRemoveClasses(first.thatcard, "match", "open");
    addRemoveClasses(second.thatcard, "match", "open");
    setTimeout(addEvents, 1000);
    //empty OcardList array
    OcardList = [];
    // correctElements is used to add the text matched to it,then it will be used to check if
    // the lenght of the array =8 and that mean all the cards matched and the game is over
    correctElements.push("matched");
    console.log(correctElements.length);
    if (correctElements.length === 8) {

      clearTimeout(myTimer);
      //if all cards have matched, display the model with a message with the final score and time
      document.getElementById("model").style.display = "block";
      document.getElementById("model-timer").innerHTML = timerFunc();
      document.getElementById("model-movesNo").innerHTML = document.getElementById("no-moves").innerHTML;
     let modelStars= document.querySelector(".stars").innerHTML;
     document.querySelector(".no-stars").innerHTML= modelStars;
    }
  }
  //if the 2 opend cards don't match re add the Events Listener (addEventListener)to them because it's alraedy
  // removed in listener function after the user clicks on the card and call the closeCards() to close the opened cards
  else {
    first.thatcard.addEventListener("click", events, false);
    second.thatcard.addEventListener("click", events, false);

    let closingCardtimer = setTimeout(function() {
      OcardList[0].thatcard.classList.remove("open", "show");
      OcardList[1].thatcard.classList.remove("open", "show");
      addEvents();
      OcardList = [];
    }, 500);
  };
};

let seconds = 0;
let min = 0;
let totalMin = 0;
// use setInterval to initialize the game timer by calling the timerFunc() every second
let myTimer;

function GameTimer() {
  clearTimeout(myTimer);
  myTimer = setInterval(timerFunc, 1000);
};


function timerFunc() {
  min = Math.floor(seconds / 60);
  totalMin = totalMin + min;
  if (seconds === 60) {
    seconds = 0;
  };
  // if the second less than 10 zero() is used to insert a 0 on the left of the seconds
  function zero() {
    if (seconds < 10) {
      return "0"
    } else return "";
  };

  let time = "00:0" + totalMin + ":" + zero() + seconds;

  document.getElementById("game-timer").innerHTML = time;

  if (totalMin === 2) {

    document.getElementById("congrats-gameOver").innerHTML = "<h1>Game Over</h1>";

    document.getElementById("model").style.display = "block";
  }
  seconds++;
  return time;
};
window.onload = restartGame();
