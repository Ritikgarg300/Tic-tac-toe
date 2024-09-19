const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPostion =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// let create a function to initialize the game
function initgame() {
    currentPlayer="X";
    console.log(currentPlayer);
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        boxes[index].classList.remove("win");
        // another reinitialization of box css property
        // box.classList =`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

}
initgame();

function swapTurns() {
    currentPlayer === 'X' ? currentPlayer = '0' : currentPlayer='X';
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}

function checkgameOver() {
     let answer="";
     winningPostion.forEach((position)=>{
        // all 3 boxes should be non empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
             && (gameGrid[position[0]] === gameGrid[position[1]])  && (gameGrid[position[1]] === gameGrid[position[2]])){
            
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "0";


                    // disable pointer event
                    boxes.forEach((box)=>{
                        box.style.pointerEvents = "none";
                    })
                 boxes[position[0]].classList.add("win");
                 boxes[position[1]].classList.add("win"); 
                 boxes[position[2]].classList.add("win");    
            }
     })
  // i have a winnwer
  if(answer !==""){
    newGameBtn.classList.add("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

  }
 
  // check tie 
  let fillcount = 0;
  gameGrid.forEach((box)=>{
     if(box !== ""){
        fillcount++;
     }
  });
  
  if(fillcount === 9){
    newGameBtn.classList.add("active");
    gameInfo.innerText ="game Tie !!!";
  }

}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurns();
        checkgameOver();
    }
    
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
           handleClick(index);
    })
})

newGameBtn.addEventListener("click",()=>{initgame()});