/*----- constants -----*/


/*----- app's state (variables) -----*/
let board; // will be a row*column-type nested array
let turn; // 1 or -1; 0 for no checker in that cell


/*----- cached element references -----*/


/*----- event listeners -----*/


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
 // render(); 
}
