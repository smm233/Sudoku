var tileSelected = null;
var numSelected = null;
var errors = 0;

const api_url = "https://sudoku-api.vercel.app/api/dosuku";

var board = [];

var solution = [];

// const difficulty = document.getElementById("difficulty");

async function getGame(difficulty) {
    while (true) {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            
            if (data.newboard && data.newboard.grids.length > 0) {
                const puzzle = data.newboard.grids[0];
                document.getElementById("board").innerHTML = "";
                document.getElementById("numbers").innerHTML = "";
                if (puzzle.difficulty === difficulty) {
                    console.log(`Found a ${difficulty} difficulty puzzle:`, puzzle);
                    board = puzzle.value;
                    solution = puzzle.solution;
                    difficulty = puzzle.difficulty;
                    console.log(difficulty);
                    setGame();
                    return;
                }
            }
        } catch (error) {
            console.error("Error fetching Sudoku puzzle:", error);
        }

        // Wait a short time before retrying to avoid spamming the API
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Event listener for buttons
document.querySelectorAll("#difficulty-tab .btn").forEach(button => {
    button.addEventListener("click", function () {
        const difficulty = this.innerText; // Get button text (Easy, Medium, Hard)
        getGame(difficulty);
    });
});

// Load a game on page load
window.onload = function () {
    getGame("Easy"); // Default difficulty
};

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