//Credits to Alex Younger for the code check him at https://www.ayweb.dev/blog/building-a-house-from-the-inside-out
function Gameboard(){
    //modified the code from connect 4 6x7 arrays into 3x3 for tictactoe 
    const rows=3;
    const columns=3;
    const board =[];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
      }
    const getBoard = () => board;
     // Getter function for the win variable
    
    
    
    
    const pickBox = (column,row, player) => {
   
      //makes sure that token wont overide each other and turn wont be used if it ever happens
     if(board[row][column].getValue()!==0){
         console.log("Please try again space is already allocated");
        game.switchPlayerTurn();
         return; 
       } 
      board[row][column].addToken(player);
    

    };
      const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };
      return { getBoard, pickBox, printBoard};
    }
   

function Cell() {
    let value = 0;
    
   
    const addToken = (player) => {
      value = player;
    };
  
  
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }

  function GameController() {
   let p1;
   let p2;
   let player1=document.querySelector('#player1');
   let player2=document.querySelector('#player2');
   p1=player1.value;
   p2=player2.value;
    const board = Gameboard();


    const players = [
      {
        name: p1,
        token: 1
      },
      {
        name: p2,
        token: 2
      }
    ];
    let defaultPlayer = () => activePlayer=players[0];  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (column,row) => {
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column}... row ${row}...`
      );
   
      console.log(p1);
      board.pickBox(column,row, getActivePlayer().token);
      endGame();
  
      switchPlayerTurn();
      printNewRound();
     
    };
   let win=0;
   const endGame=()=>{
    const playerTurnDiv = document.querySelector('.result');
    a=getActivePlayer().token;
    const chkBoard = board.getBoard().map((row)=>row.map((cell)=>cell.getValue()));
    //diagonal win condition
if ((chkBoard[0][0] === a && chkBoard[1][1] === a && chkBoard[2][2] === a) || (chkBoard[0][2] === a && chkBoard[1][1] === a && chkBoard[2][0] === a)){
  playerTurnDiv.textContent = `${activePlayer.name} Wins`;
console.log(`${getActivePlayer().name} Wins`);
win=1;
}
     //tie condition
    const hasDefaultValue = chkBoard.some(row => row.includes(0));
    if(hasDefaultValue==false && win==0){
      playerTurnDiv.textContent = `Its a Tie!`;
      console.log('its a tie');
      win=1;
    }
    // horizontal win condition
    for(let i=0;i<3;i++){
        const winRowChk=board.getBoard()[i].map((cell)=> cell.getValue())
      if (JSON.stringify(winRowChk) === JSON.stringify([a,a,a])) {
        playerTurnDiv.textContent = `${activePlayer.name} Wins`;
        console.log(`${getActivePlayer().name} Wins`);
        win=1;
      }
}
//vertical win
const winRowChk=board.getBoard().map((row)=>row.map((cell)=>cell.getValue()));
for(let i=0;i<3;i++){
  let temp=0;
  for(let j=0;j<3;j++){
if (JSON.stringify(winRowChk[j][i]) === JSON.stringify(a)) {
 temp=temp+1;
}
if(temp==3){
  playerTurnDiv.textContent = `${activePlayer.name} Wins`;
  console.log(`${getActivePlayer().name} Wins`);
  win=1;
}
}

}

   }
   const newWin = (newWinState) => win=newWinState; 
   const getWin = () => win;
    
  
    printNewRound();
    return {
      playRound,
      getActivePlayer,
      switchPlayerTurn,
      getWin,
      newWin,
      getBoard: board.getBoard,
      defaultPlayer,
      
    };
  } 
  
  function ScreenController() {
    game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
   
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
      
  
      if(game.getWin()==1){
       
        playerTurnDiv.textContent =``;
    
      }
      // Display player's turn
      else{
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
      }
      // Render board squares
      board.forEach((row,rowIndex) => {
        row.forEach((cell, columnIndex) => {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.column = columnIndex;
          cellButton.dataset.row = rowIndex;
          if(cell.getValue()==1){
            cellButton.textContent = 'X';
          }
          else if(cell.getValue()==2){
            cellButton.textContent = 'O';
          }
          // cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        })
      })
     
    }
    

    // Add event listener for the board
    function clickHandlerBoard(e) {
      if(game.getWin()==1)return;
      const selectedColumn = e.target.dataset.column;
      const selectedRow = e.target.dataset.row;
      // // Make sure I've clicked a column and not the gaps in between
       if (!selectedColumn || !selectedRow) return;
       
      game.playRound(selectedColumn,selectedRow);
     
      updateScreen();
    }
  

    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
    return updateScreen;
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  let game;
  menu();
  function menu(){
    const containerDiv=document.querySelector('.container');
    const start=document.querySelector('.start');
    const createRestart = document.createElement("button");
    createRestart.textContent='Restart';
    createRestart.classList.add('restart');
    start.addEventListener('click', ()=>{
    
      let show=ScreenController();
      show;
      containerDiv.removeChild(start);
      containerDiv.appendChild(createRestart);
      const restart=document.querySelector('.restart');
      const inputDiv=document.querySelector('.input');
      containerDiv.removeChild(inputDiv);
      restart.addEventListener('click',()=>{
      for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
       game.getBoard()[i][j].addToken(0);
        }
      }
      
      game.newWin(0);
      result=document.querySelector('.result');
      result.textContent="";
      game.defaultPlayer(0);
      show();

        //console.log(game.getBoard().map((row) => row.map((cell) => cell.getValue())));
        });
      
    });

   
  }

 
