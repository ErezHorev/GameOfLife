
function game(canvas) {
    console.log("creating new game");
    this.canvas = canvas;
    this.draw = draw;
    this.start = start;
}

function start() {
    initCells();
    this.draw();
}

function initCells() {
    // TODO: support special patterns like glider gun...etc
    var cells = [[]];
    for (row = 0; row < 10; row++) {
        cells[row] = [];
        for (line = 0; line < 10; line++) {
            cells[row][line] = 1;
        }
    }
    console.log(cells)

    cells.forEach(function (point) {
        console.log(point[0], point[1])
    });
}

function draw() {
    console.log("starting to draw on canvas...")
}
