
/*-------------------------------------PSEUDOCODE---------------------------------------*/
// 1) Define required constants
/*----- constants -----*/
const COLORS = {
  "0": 'white',
  "1": 'blue',
  "-1": 'yellow'
}

// 2) Define required variables used to track the state of the game
/*----- app's state (variables) -----*/
let board; // will be a row*column-type nested array
let turn; // 1 or -1; 0 for no checker in that cell
let winner;
let player;
let idx1;
let idx2;

// 3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector("h2");

// 4) Upon loading the app should:
// 	4.1) Initialize the state variables
// 	4.2) Render those values to the page
// 	4.3) Wait for the user to click a triangle marker

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);

/*----- functions -----*/
init();

//initialize state, then call render()
function init() {
 board = [
   [0, 0, 0, 0, 0, 0], // column 0
   [0, 0, 0, 0, 0, 0], // column 1
   [0, 0, 0, 0, 0, 0], // column 2
   [0, 0, 0, 0, 0, 0], // column 3
   [0, 0, 0, 0, 0, 0], // column 4 
   [0, 0, 0, 0, 0, 0], // column 5 
   [0, 0, 0, 0, 0, 0], // column 6
 ]; 
 turn = 1;
 render();
 renderMarkers(); 
}

//hide/show the markers; hide if no 0's exist in the column
function renderMarkers() {
  markerEls.forEach(function(markerEl, colIdx){
    markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
  })
}

function render() {
  // iterate over column arrays
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[cellVal];
    })
  });
  renderMarkers();
  renderMessage();
}

function renderMessage() {
  if (winner === 'T') {
      msgEl.innerHTML = "It's a Tie!!!";
  } else if (winner === 1 || winner === -1) {
      msgEl.innerHTML = `<span style=“color:${COLORS[winner]}“>${COLORS[winner].toUpperCase()}</span> Wins!`;
  } else {
      msgEl.innerHTML = `<span style=“color:${COLORS[turn]}“>${COLORS[turn].toUpperCase()}</span>'s Turn`;
  }
}

// 5) Handle a player clicking a square
// update all impacted state then call render()
function handleDrop(event) {
  const colIdx = markerEls.indexOf(event.target);
  if(colIdx === -1 || winner) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  winner = checkWin(colIdx, rowIdx, player);
  turn = turn * -1
  render();
} 


//win functions
 function checkVertWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  rowIdx--;
  // Count until no longer the same 'player'
  while(colArr[rowIdx] === player && rowIdx >= 0) {
      count++;
      rowIdx--;
  }
  return count === 4 ? player : null;
}

 function checkHorizWin(colIdx, rowIdx, player) {
  let idx = colIdx + 1;
  let count = 1;
  while(idx < board.length && board[idx][rowIdx] === player) {
      count++;
      idx++;
  }
  idx = colIdx - 1;
  while(idx >= 0 && board[idx][rowIdx] === player) {
      count++;
      idx--;
  }
  return count === 4 ? player : null;
}

function checkRightDiagWin(colIdx, rowIdx) {
  const colArr = board[colIdx][rowIdx];
  let count = 1;
  let idx1 = colIdx - 1;
  let idx2 = rowIdx + 1;
  while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === colArr) {
      
      count++;
      idx1--;
      idx2++;
  }

  idx1 = colIdx + 1;
  idx2 = rowIdx - 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === colArr) {
     
      count++;
      idx1++;
      idx2--;
  }
  return count >= 4 ? winner = turn * 1 : 0; 
};
  
function checkLeftDiagWin(colIdx, rowIdx) {
  const colArr = board[colIdx][rowIdx];
  let count = 1;
  let idx1 = colIdx + 1;
  let idx2 = rowIdx +1;

  while (idx1 < board.length && idx2 > board[0].length && board[idx1][idx2] === colArr) {
  count++;
  idx1++;
  idx2++;

  } 
  idx1 = colIdx - 1;
  idx2 = rowIdx - 1;
  while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === colArr) {
      count++;
      idx1--;
      idx2--;
  }
  return count >=4 ? winnter = turn * 1 : 0;
}



function checkWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
 return checkVertWin(colIdx, rowIdx, player) ||
      checkHorizWin(colIdx, rowIdx, player)||
      checkRightDiagWin(colIdx, rowIdx)||
      checkLeftDiagWin(colIdx, rowIdx)||
      (board.flat().includes(0) ?null : 'T');
};
// 6) Handle a player clicking the replay button
//[user should press "refresh" button on browser to replay game]
















/*------------------------------------------play code for later--------------------------------------------------*/
// function checkPosDiagWin(colIdx, rowIdx, player)  {
//   let idx1 = colIdx + 1;
//   let idx2 = rowIdx + 1;
//   let count = 1;
//   while(idx1 < board.length && idx2 < board[idx][rowIdx] && board[idx][rowIdx] === player) {
//       count++;
//       idx1++;
//       idx2++;
//   }
//   let idx1 = colIdx - 1;
//   let idx2 = rowIdx - 1;
//   let count = 1;
//   while(idx >= 0 && board[idx][rowIdx] === player) {
//       count++;
//       idx1--;
//       idx2--;
//   }
//   return count === 4 ? player : null;
// }


// function checkPosDiagWin(colIdx, rowIdx, player) {
//   let count = 1;
//   // think of climbing up an x,y graph [(x+1),(y+1)] except the board is y,x in UI/UX
//   //right diag
//   let idx1 = colIdx + 1;
//   let idx2 = rowIdx + 1;
//   while (idx1 < board.length && idx2 < board[0].length && board[idx1][idx2] === player) {
//     count++;
//     idx1++;
//     idx2++;
//   }
//   idx1 = colIdx - 1;
//   idx2 = rowIdx + 1;
//   while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === player) {
//     count++;
//     idx1--;
//     idx2--;
//   }
//   return count === 4 ? player : null;
// }

// function checkNegDiagWin(colIdx, rowIdx, player) {
//   let count = 1;
//   idx1 = colIdx + 1;
//   idx2 = rowIdx - 1;
//   while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
//     count++;
//     idx1++;
//     idx2--;
//   }
//   idx1 = colIdx - 1;
//   idx2 = rowIdx + 1;
//   while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === player) {
//     count++;
//     idx1--;
//     idx2--;
//   }
//   return count === 4 ? player : null;
// }



//final check
// function checkWin(colIdx, rowIdx) {
//   const player = board[colIdx][rowIdx];
//   return checkVertWin(colIdx, rowIdx, player) ||
//     checkHorizWin(colIdx, rowIdx, player) || checkRightDiagWin(colIdx, rowIdx, player) || checkLeftDiagWin(colIdx, rowIdx, player);
  
// }

