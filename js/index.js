/*----- constants -----*/
//users ship placement
let userShipPlacement = {
  carrier: {
    pegs: [],
    maxLen: 6
  },
  large: {
    pegs: [],
    maxLen: 5
  },
  medium: {
    pegs: [],
    maxLen: 4
  },
  small: {
    pegs: [],
    maxLen: 3
  },
  smallest: {
    pegs: [],
    maxLen: 2
  },
  totalPegs: 0
};

let compShipPlacement = {
  carrier: {
    pegs: [],
    maxLen: 6
  },
  large: {
    pegs: [],
    maxLen: 5
  },
  medium: {
    pegs: [],
    maxLen: 4
  },
  small: {
    pegs: [],
    maxLen: 3
  },
  smallest: {
    pegs: [],
    maxLen: 2
  },
  totalPegs: 0
};

const placementDirection = ["up", "down", "left", "right"];

let userBoard = new Array(100).fill(null);
let compBoard = new Array(100).fill(null);
console.log("USER BOARD ", userBoard);
let currShipPlaced = null;
//comps ship placement
/*----- app's state (variables) -----*/
//winner
//currentTurn
//
/*----- cached element references -----*/
//game-board
document
  .querySelector(".button-container")
  .addEventListener("click", handlePlacedShipSelection);
document
  .getElementById("player-ready")
  .addEventListener("click", handlePlayerReady);
// document.getElementById("player-ready").style = "display: none";
/*----- event listeners -----*/
//a function that handles a user placing a ship on the board
//a function that handles a direct hit

/*----- functions -----*/
//need a function to create the board
//need a function to handle when a user places a ship piece on the board
//need a function to handle the computer placing a piece on the board
//need a function to check if a ship has been sunk
//need a check for win function

init();

function handlePlayerReady(e) {
  document.getElementById("subheader").textContent =
    "Please wait while the computer places its ships...";
  generateRandomShip();
}

function generateRandomShip() {
  let randomDirection = placementDirection[Math.floor(Math.random() * 4)];
  let randomBoardIdx = Math.floor(Math.random() * 100);
  console.log(randomBoardIdx);
  console.log(randomDirection);
}

function determineSubHeaderText(ship) {
  if (!ship) {
    document.getElementById("subheader").textContent =
      "What size ship would you like to place?";
  } else if (ship === "carrier") {
    document.getElementById("subheader").textContent =
      "Place 6 consecutive pegs";
  } else if (ship === "large") {
    document.getElementById("subheader").textContent =
      "Place 5 consecutive pegs";
  } else if (ship === "medium") {
    document.getElementById("subheader").textContent =
      "Place 4 consecutive pegs";
  } else if (ship === "small") {
    document.getElementById("subheader").textContent =
      "Place 3 consecutive pegs";
  } else if (ship === "smallest") {
    document.getElementById("subheader").textContent =
      "Place 2 consecutive pegs";
  }
}

function handlePlacedShipSelection(e) {
  if (currShipPlaced) {
    document.getElementById(currShipPlaced).style = "background-color: white";
  }

  if (e.target.tagName === "BUTTON") {
    let ship = e.target.textContent.toLowerCase();
    currShipPlaced = ship;
    document.getElementById(ship).style = "background-color: rgb(48, 97, 59)";
    determineSubHeaderText(ship);
  }
}

function handleComputerPlaceShips() {}

function handleUserPlacedShip(e) {
  //userShipPlacement.push(e.target.id);
  e.target.style = "background-color: white";
  if (!currShipPlaced) {
    document.getElementById("subheader").textContent =
      "Please select a ship before placing any pegs!";
    setTimeout(() => {
      determineSubHeaderText(currShipPlaced);
    }, 2000);
    e.target.style = "background-color: rgb(48, 97, 59)";
  }
  let shipPegs = userShipPlacement[currShipPlaced].pegs;
  let pegIdx = parseInt(e.target.id - 1);
  if (shipPegs.length < userShipPlacement[currShipPlaced].maxLen) {
    //push id of selected div to the corresponding array within userShipPlacement
    if (!shipPegs.length) {
      userShipPlacement[currShipPlaced].pegs.push(pegIdx);
      userBoard[pegIdx] = "ship";
      userShipPlacement.totalPegs++;
    } else {
      if (
        Math.abs(e.target.id - shipPegs[shipPegs.length - 1]) !== 1 &&
        Math.abs(e.target.id - shipPegs[shipPegs.length - 1]) !== 10 &&
        Math.abs(
          shipPegs[shipPegs.length - 1] - 10 * shipPegs.length !==
            parseInt(e.target.id)
        ) &&
        Math.abs(shipPegs[shipPegs.length - 1] - 2 !== parseInt(e.target.id)) &&
        Math.abs(shipPegs[shipPegs.length - 1] + 2 !== parseInt(e.target.id))
      ) {
        document.getElementById("subheader").textContent =
          "Please place a ship peg adjacent to the current selected ship!";
        e.target.style = "background-color: rgb(29, 35, 48)";
        setTimeout(() => {
          determineSubHeaderText(currShipPlaced);
        }, 2000);
      } else {
        userShipPlacement[currShipPlaced].pegs.push(pegIdx);
        userBoard[pegIdx] = "ship";
        userShipPlacement.totalPegs++;
      }
    }
  } else {
    document.getElementById("subheader").textContent =
      "You've reached the maximum number of pegs allowed for this ship!";
    currShipPlaced = null;
    e.target.style = "white";
  }
  if (userShipPlacement.totalPegs === 20) {
    for (let i = 0; i < 5; i++) {
      document.querySelectorAll(
        ".button-container > button:not(#player-ready)"
      )[i].style = "display: none";
    }
    document.getElementById("player-ready").style = "display: block";
    document.getElementById("subheader").textContent = "Are you ready?";
  }
}

function init() {
  createCompBoard();
  createUserBoard();
}

//create computer game board
function createCompBoard() {
  //decrementing to ensure each square has unique id from user board
  for (let i = -1; i > -101; i--) {
    const square = document.createElement("div");
    square.classList.add("board-square");
    square.setAttribute("id", i);
    document.getElementById("comp-board").appendChild(square);
  }
  document.getElementById("comp-board").style = "display: none";
}

//create user game board
function createUserBoard() {
  for (let i = 1; i < 101; i++) {
    const square = document.createElement("div");
    square.classList.add("board-square");
    square.setAttribute("id", i);
    square.addEventListener("click", handleUserPlacedShip);
    document.getElementById("user-board").appendChild(square);
  }
}
