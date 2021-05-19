'use strict'
console.log('2021-05-19');

const EMPTY = '⬜';
const MINE = '🎇';
const FLAG = '🎏';

var gBoard;

var gLevel = {
 SIZE: 4,
 MINES: 2
};

var gGame = {
 isOn: false,
 shownCount: 0,
 markedCount: 0,
 secsPassed: 0
}

function setLevel(size, mines) {
    gLevel.SIZE = size;
    gLevel.MINES = mines;
}

function init() {
    gGame.isOn = true;
    gBoard = buildBoard();
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {minesAroundCount: 4,
                           isShown: true,
                           isMine: false,
                           isMarked: false};
        }
    }
    board[0][1].isMine = true;
    board[1][3].isMine = true;
    return board;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var minesCount = 0;
            for (var k = i-1; k <= i+1; k++) {
                for (var l = j-1; l <= j+1; l++) {
                    if (k < 0 || l < 0 || k >= board.length || l >= board.length) continue;
                    if (k === i && l === j) continue;
                    if (board[k][l].isMine) minesCount++;
                }
            }
            board[i][j].minesAroundCount = minesCount;
        }
    }    
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i< gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for(var j = 0; j< gLevel.SIZE; j++) {
            var cellString = EMPTY;
            if (board[i][j].isShown) {
                if (board[i][j].isMine) cellString = MINE;
                else if (board[i][j].isMarked) cellString = FLAG;
                else cellString = board[i][j].minesAroundCount + '';
            }
            var className = 'cell-' + i + '-' + j;
            strHTML += `<td onclick="cellClicked(this,${i},${j})" class="${className}">${cellString}</td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



























/*



function cellclicked(clickCell,elCell) {

    
}


function timerOn() {
    var elTimer = document.querySelector('.timer');
    gGameTime = setInterval(function () { 
        gTimer += 0.01;
        elTimer.innerText = gTimer.toFixed(2);
    },10);         
}

function stopTimer() {
    clearInterval(gGameTime);
}


function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
      randIdx = getRandomInt(0, items.length - 1);
  
      keep = items[i];
      items[i] = items[randIdx];
      items[randIdx] = keep;
    }
    return items;
  }
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
*/
