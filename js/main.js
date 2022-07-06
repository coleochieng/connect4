/*----- constants -----*/
const COLORS = {
  0: 'white',
  1: 'red',
  -1: 'black'
}

/*----- app's state (variables) -----*/
let board; // will be a row*column-type nested array
let turn; // 1 or -1; 0 for no checker in that cell


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
    markerEl.style.
  })
}

function render() {
  // iterate over column arrays
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellEl = document.getElementById('c${colIdx}r${rowIdx}');
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
  if (!colArr.includes(0)) return;
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  turn = turn * -1
  render();
}