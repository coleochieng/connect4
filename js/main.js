/*----- constants -----*/
const COLORS = {
  "0": 'white',
  "1": 'blue',
  "-1": 'yellow'
}

/*----- app's state (variables) -----*/
let board; // will be a row*column-type nested array
let turn; // 1 or -1; 0 for no checker in that cell
let winner;


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];

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
}

// update all impacted state then call render()
function handleDrop(event) {
  const colIdx = markerEls.indexOf(event.target);
  if(colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  winner = checkWin(colIdx, rowIdx);
  turn = turn * -1
  render();
} 

 function checkVertWin(colIdx, rowIdx, player) {
  const colArr = board[colIdx];
  let count = 1;
  // We can use/modify rowIdx because we won't need
  // to access it's original value anymore
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
  
  // Count until no longer the same 'player'
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

function checkWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  return checkVertWin(colIdx, rowIdx, player) ||
    checkHorizWin(colIdx, rowIdx, player) || checkRightDiagWin(colIdx, rowIdx, player) || checkLeftDiagWin(colIdx, rowIdx, player);
  
}



function checkRightDiagWin(colIdx, rowIdx, player) {
  let count = 1;
  // think of climbing up an x,y graph [(x+1),(y+1)] except the board is y,x in UI/UX
  //right diag
  let idx1 = colIdx + 1;
  let idx2 = rowIdx + 1;
  while (idx1 < board.length && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2++;
  }
  idx1 = colIdx - 1;
  idx2 = rowIdx + 1;
  while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2--;
  }
  return count === 4 ? player : null;
}

function checkLeftDiagWin(colIdx, rowIdx, player) {
  idx1 = colIdx + 1;
  idx2 = rowIdx - 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  idx1 = colIdx - 1;
  idx2 = rowIdx + 1;
  while (idx1 >= 0 && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  return count === 4 ? player : null;
}
