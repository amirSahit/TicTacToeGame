import "./style.css";

///PART 2.

//now I want to declare some types
//things I need

//1. type for coordinates [number, number], that will track each single cell
type Coordinates = [number, number];

//2. type for player : name | symbol | score
type Player = {
  name: string;
  symbol: "x" | "o"; //union type
  score: number;
};
//3. i need a type for my cells? they could have an element type,-- check if it is marked: string | null

type CellState = {
  markedBy: string | null;
  element: Element;
};

//Part .3

// utility functions or tools that will help me keep track of things

function coordToId(coord: Coordinates): `${number}-${number}` {
  const [row, col] = coord;
  return `${row}-${col}`;
}

// taking ID and change them to coordinate

function idToCoord(id: `${number}-${number}`): Coordinates {
  const [row, col] = id.split("-");
  return [parseInt(row), parseInt(col)];
}

////// Part 1.
//create a grid with js

//I need some sort of a function
//I need to loop
//everytime I loop, I have to create an element
//once I create the element, I need to give it some styling
// then I need to append it to the parent: in this case it is #grid-container

const gridCellStyling = ["h-[200px]", "w-[200px]", "border", "border-black"];
const gridSize = 3;
// grab my grid container from the dom
const gameGrid = document.getElementById("grid-container")!;

//Part 3 /2.
const currentPlayerElement = document.getElementById(
  "current-player"
) as Element;
const resetButton = document.getElementById("reset-button");

//initializing players
const players: Array<Player> = [
  { name: "Player1", symbol: "x", score: 0 },
  { name: "Player2", symbol: "o", score: 0 },
];

//initializing state this is where we have the turns set to 0 as the default
let turn = 0;
let gameEndState = false; //when the game round is done by draw or a win
console.log(turn);
console.log(gameEndState);

//initial state - player1 gets round 1 --
//also the string that we are rebdering on top of our grid that dispals the players whos turn it is,
//and if a player won the game, or it was a draw -- a display message we interact with the user

// this is where we are tracking the game from the point of initioal state, to the point when we reach the end state. Everything in between
//CellState here refers to the type declared above, which is pointing at teh activities ....
let gameState: Record<string, CellState> = {}; //this is the container to keep track of the game

const winConditions = [
  ["0-0", "0-1", "0-2"],
  ["1-0", "1-1", "1-2"],
  ["2-0", "2-1", "2-2"],
  ["0-0", "1-0", "2-0"],
  ["0-1", "1-1", "2-1"],
  ["0-2", "1-2", "2-2"],
  ["0-0", "1-1", "2-2"],
  ["2-0", "1-1", "0-2"],
];

function didIwin() {
  for (const winCondition of winConditions) {
    const [cell1, cell2, cell3] = winCondition.map((id) => gameState[id]);

    const winner =
      cell1.markedBy != null &&
      cell2.markedBy != null &&
      cell3.markedBy != null &&
      cell1.markedBy == cell2.markedBy &&
      cell2.markedBy == cell3.markedBy &&
      cell3.markedBy == cell1.markedBy;

    if (winner) {
      return true;
    }
  }
}

// create a simple function that displays : congratulatory winning message

// you need to do something where currently we are displaying the current players turn

function displayWinner() {
  currentPlayerElement.textContent = `Congrats ${players[turn].name} won the game!`;
}

// Part 3 /2 END

//dynamic gridStyling
//const gridStyling = [`grid-cols-${gridSize}`];

//I need some sort of a function
function makeMyGrid() {
  //creating a path
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      //create gridcell
      const cell = document.createElement("div");
      //add some styling in ---- line 11
      // apply styling to each div - you need to spread them without the commas
      cell.classList.add(...gridCellStyling);

      //attach ids to the cells

      //generate IDs
      const id = coordToId([row, col]);
      cell.id = id;

      // we initialize the cell state here, so it can be tracked here - also track eventListener for player symbols of "x" or "o"
      gameState[id] = {
        markedBy: null,
        element: cell,
      };

      //append the child to the DOM
      gameGrid.appendChild(cell);

      //add eventListener to the cells
      cell.addEventListener("click", (event) => {
        if (!gameEndState) {
          //need to know whos turn it is
          const currentPlayer = players[turn];

          //whichever player turn it is, add their symbol, to the "markedBy" key for each specific cell

          const cellState = gameState[id];

          const isMarked = Boolean(cellState.markedBy);

          if (!isMarked) {
            cellState.markedBy = currentPlayer.name;

            //update the cell to render the symbol on the tictactoe

            cell.innerHTML = `<div class = "flex justify-center items-center h-full"><p class="text-5xl">${currentPlayer.symbol}</p></div>`;

            //here we have to bring our function for checking win condition
            const Gamewinner = didIwin();

            if (Gamewinner) {
              displayWinner();
              gameEndState = true;
              return;
            }
            // go to the next turn and one can always wrap around
            turn = (turn + 1) % players.length;

            const nextPlayer = players[turn];

            currentPlayerElement.textContent = `The current player is: ${nextPlayer.name}`;
          }
        }
      });
    }
  }
}

makeMyGrid();
//Problem with this code = hard to adjust --- jump to line 12
