const board = document.querySelector('.game-board');
const rowCount = 5;
const colCount = 5;
const imageValue = ['x','o'];

function resetBoard() {
  createSquareBox();
  checkForMatch();
}

resetBoard();

function generateRandomValue(){
  return imageValue[(Math.floor(Math.random()* 2))];
}

function createSquareBox() {
  var rows = new Array(rowCount);
  rows.fill(new Array(colCount));

  rows = rows.map((row, rowNum) => {
    row.fill(1);
    return row.map((col, colNum) => {
      return `${rowNum}${colNum+1}`;
    })
  })

  rowStr = rows.reduce((fr, r) => {
    let colStr = r.reduce((fc, c) => {
      return `${fc}<div class="col"><span>${generateRandomValue()}</span></div>`;
    }, '');
    return `${fr}<div class="row">${colStr}</div>`;
  }, '');

  board.innerHTML = rowStr;
}

function checkForMatch() {
  let allBoxes = document.querySelectorAll('.col');
  let previousMove = null;

  for(let i = 0; i< allBoxes.length; i +=1){
    allBoxes[i].addEventListener('click' , (e) => {
      e.target.parentElement.classList.add('disable');
      if(previousMove != null){
        if(previousMove == e.target.textContent){
          setTimeout(function(){
            alert('Match found.');
            resetBoard();
          }, 200);
        } else{
          previousMove = e.target.textContent;
        }
      } else {
        previousMove = e.target.textContent;
      }
    });
  }
}