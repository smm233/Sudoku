var tileSelected = null;
var numSelected = null;
var errors = 0;

const api_url = "https://sudoku-api.vercel.app/api/dosuku";

var board = [];

var solution = [];

const difficulty = document.getElementById("difficulty");

async function getGame(url) {
    const response = await fetch(url);
    var data = await response.json();
    board = data.newboard.grids[0].value;
    solution = data.newboard.grids[0].solution;
    difficulty.innerHTML = data.newboard.grids[0].difficulty;
    setGame();
}


window.onload = function () {
    getGame(api_url);
}

function setGame() {
    for(let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("numbers").appendChild(number);
    }

    for (let a = 0; a < 9; a++) {
        for (let b = 0; b < 9; b++) {
            let tile = document.createElement("div");
            tile.id = a.toString() + "-" + b.toString();
            if (board[a][b] != "0") {
                tile.innerText = board[a][b];
                tile.classList.add("tile-initial");
            }
            if (a == 2 || a == 5) {
                tile.classList.add("horizontal-line")
            }
            if (b == 2 || b == 5) {
                tile.classList.add("vertical-line")
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("num-selected");
    }
    numSelected = this;
    numSelected.classList.add("num-selected");
}

function selectTile() {
    if (numSelected) {
        if(this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let a = parseInt(coords[0]);
        let b = parseInt(coords[1]);

        if (solution[a][b] == numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function solveGame() {
    document.getElementById("board").innerHTML = "";
    for (let a = 0; a < 9; a++) {
        for (let b = 0; b < 9; b++) {
            let tile = document.createElement("div");
            tile.id = a.toString() + "-" + b.toString();
            if (board[a][b] != "0") {
                tile.innerText = board[a][b];
                tile.classList.add("tile-initial");
            }
            if (board[a][b] == "0") {
                tile.innerText = solution[a][b];
            }
            if (a == 2 || a == 5) {
                tile.classList.add("horizontal-line")
            }
            if (b == 2 || b == 5) {
                tile.classList.add("vertical-line")
            }
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}