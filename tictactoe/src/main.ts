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
const currentPlayer = document.getElementById("current-player") as Element;
const resetButton = document.getElementById("reset-button");

//initializing players
const players: Array<Player> = [
  { name: "Player1", symbol: "x", score: 0 },
  { name: "Player2", symbol: "o", score: 0 },
];

//initializing state
let turn = 0;
let gameEndState = false; //when the game round is done by draw or a win
console.log(turn);
console.log(gameEndState);
//currentPlayer.textContent = `The current player is: ${players[0].name}`; //initial state - player1 gets round 1

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

function checkingWinConditions() {
  for (let i = 0; i < winConditions.length; i++) {
    console.log(winConditions[i]);
  }
}

checkingWinConditions();

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

      //append the child to the DOM
      gameGrid.appendChild(cell);
    }
  }
}

makeMyGrid();
//Problem with this code = hard to adjust --- jump to line 12
