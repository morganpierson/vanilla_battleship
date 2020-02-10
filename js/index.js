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
  }
};

const placementDirection = ["up", "left", "down", "right"];

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

//!!!!! TODO: FINISH COMP LOGIC...CURRENTLY EXCEEDING CALL STACK !!!!!!
function generateRandomShip() {
  let randomDirection;
  let randomBoardIdx;
  let cachedSpaces = {
    carrier: {},
    large: {},
    medium: {},
    small: {},
    smallest: {}
  };
  let mockBoard = [];
  let concatBoard = [];
  //need to place random pegs on computer board
  //represented by the indexes of compBoard array
  //maybe loop thru compShipPlacement obj and fill each ship with random index until all ships full
  let newCompShipPlacement = compShipPlacement;
  for (let key in newCompShipPlacement) {
    randomDirection = placementDirection[Math.floor(Math.random() * 4)];
    //generate random index for ship to start at
    randomBoardIdx = Math.floor(Math.random() * 100);
    // while (newBoard[randomBoardIdx] !== null) {
    //   randomBoardIdx = Math.floor(Math.random() * 100);
    // }

    if (randomBoardIdx === 0) {
      randomDirection = "down";
    } else if (randomBoardIdx === 9) {
      randomDirection = "left";
    } else if (randomBoardIdx === 90) {
      randomDirection = "right";
    } else if (randomBoardIdx === 99) {
      randomDirection = "up";
    }
    //newCompShipPlacement[key].pegs.push(randomBoardIdx);

    let i = 0;
    while (i < newCompShipPlacement[key].maxLen) {
      //generate random direction in which ship will be placed

      //need logic for determining how to prevent collisions
      //if direction is right and ship length is 4
      //there must be 3 null spaces available 3 indexes up from randomBoardIdx
      //if direction is down and ship length is 4
      //there must be 3 null indexes available at randomBoardIdx + 10, 20, 30...
      //need to repeat this check for as long as the ships maxLen is
      switch (randomDirection) {
        case "up":
          if (
            !cachedSpaces[key][randomBoardIdx - i * 10] &&
            randomBoardIdx - i * 10 > 0 &&
            !mockBoard.includes(randomBoardIdx - i * 10)
          ) {
            newCompShipPlacement[key].pegs.push(randomBoardIdx - i * 10);
            cachedSpaces[key][randomBoardIdx - i * 10] = true;
            concatBoard.push(randomBoardIdx - i * 10);
            break;
          } else {
            cachedSpaces[key] = {};
            newCompShipPlacement[key].pegs = [];
            randomDirection = placementDirection[Math.floor(Math.random() * 4)];
            //generate random index for ship to start at
            randomBoardIdx = Math.floor(Math.random() * 100);
            newCompShipPlacement[key].pegs.push(randomBoardIdx);
            cachedSpaces[key][randomBoardIdx] = true;
            concatBoard = [];
            concatBoard.push(randomBoardIdx);
            i = 0;
            break;
          }
        case "down":
          if (
            !cachedSpaces[key][randomBoardIdx + i * 10] &&
            randomBoardIdx + i * 10 < 99 &&
            !mockBoard.includes(randomBoardIdx + i * 10)
          ) {
            newCompShipPlacement[key].pegs.push(randomBoardIdx + i * 10);
            cachedSpaces[key][randomBoardIdx + i * 10] = true;
            concatBoard.push(randomBoardIdx + i * 10);
            break;
          } else {
            cachedSpaces[key] = {};
            newCompShipPlacement[key].pegs = [];
            randomDirection = placementDirection[Math.floor(Math.random() * 4)];
            //generate random index for ship to start at
            randomBoardIdx = Math.floor(Math.random() * 100);
            newCompShipPlacement[key].pegs.push(randomBoardIdx);
            cachedSpaces[key][randomBoardIdx] = true;
            concatBoard = [];
            concatBoard.push(randomBoardIdx);
            i = 0;
            break;
          }
        case "right":
          if (
            !cachedSpaces[key][randomBoardIdx + i] &&
            randomBoardIdx + i < 99 &&
            !mockBoard.includes(randomBoardIdx + i)
          ) {
            newCompShipPlacement[key].pegs.push(randomBoardIdx + i);
            cachedSpaces[key][randomBoardIdx + i] = true;
            concatBoard.push(randomBoardIdx + i);
            break;
          } else {
            cachedSpaces[key] = {};
            newCompShipPlacement[key].pegs = [];
            randomDirection = placementDirection[Math.floor(Math.random() * 4)];
            //generate random index for ship to start at
            randomBoardIdx = Math.floor(Math.random() * 100);
            newCompShipPlacement[key].pegs.push(randomBoardIdx);
            cachedSpaces[key][randomBoardIdx] = true;
            concatBoard = [];
            concatBoard.push(randomBoardIdx);
            i = 0;
            break;
          }
        case "left":
          if (
            !cachedSpaces[key][randomBoardIdx - i] &&
            randomBoardIdx - i > 0 &&
            !mockBoard.includes(randomBoardIdx - i)
          ) {
            newCompShipPlacement[key].pegs.push(randomBoardIdx - i);
            cachedSpaces[key][randomBoardIdx - i] = true;
            concatBoard.push(randomBoardIdx - i);
            break;
          } else {
            cachedSpaces[key] = {};
            newCompShipPlacement[key].pegs = [];
            randomDirection = placementDirection[Math.floor(Math.random() * 4)];
            //generate random index for ship to start at
            randomBoardIdx = Math.floor(Math.random() * 100);
            newCompShipPlacement[key].pegs.push(randomBoardIdx);
            cachedSpaces[key][randomBoardIdx] = true;
            concatBoard = [];
            concatBoard.push(randomBoardIdx);
            i = 0;
            break;
          }
        default:
          console.log("NOPE");
          break;
      }
      ++i;
    }
    mockBoard = mockBoard.concat(concatBoard);
    concatBoard = [];
  }

  //need to prevent collisions
  //no two ships can share indexes

  compShipPlacement = newCompShipPlacement;
  let newBoard = compBoard;

  for (let j = 0; j < mockBoard.length; j++) {
    newBoard[mockBoard[j]] = "ship";
  }

  compBoard = newBoard;
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
