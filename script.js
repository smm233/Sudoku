var tileSelected = null;
var numSelected = null;
var errors = 0;

var board = [
    "007491605",
    "200060309",
    "000007010",
    "058600004",
    "003000090",
    "006200187",
    "904070002",
    "670830000",
    "810045000"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function () {
    setGame();
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