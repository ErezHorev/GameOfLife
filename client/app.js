
function game(canvas) {
    console.log("creating new game");
    this.canvas = setCanvas(canvas);

    this.cells = [];
    // methods
    this.draw = draw;
    this.start = start;
}

function setCanvas(canvas){
    canvas.ctx = canvas.getContext('2d')
    canvas.ctx.strokeStyle = 'lightgray';
    canvas.ctx.fillStyle = 'black';
    return canvas
}

function start() {
    rows = this.canvas.attributes.height.value
    lines = this.canvas.attributes.width.value

    this.cells = initCells(rows, lines);
    this.draw();
}

function initCells(rows, lines) {
    // TODO: support common patterns like glider gun...etc
    console.log("Initializing cells on:", rows, "rows", "and", lines, "lines")

    var cells = [[]];
    for (row = 0; row < rows; row++) {
        cells[row] = [];
        for (line = 0; line < lines; line++) {
            cells[row][line] = 0;
        }
    }
    console.log(cells)

    // cells.forEach(function (x, y) {
    //     console.log(x, y)
    // });
    return cells
}

function draw() {
    console.log("starting to draw on canvas...");
    var canvas = this.canvas;
    var cellSize = 10;

    this.cells.forEach(function (row, x) {
        row[x] = 1;
        row.forEach(function (cell, y) {
            line[y] = 1;
            canvas.ctx.beginPath();
            canvas.ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
            if (cell) {
                canvas.ctx.fill();
            } else {
                canvas.ctx.stroke();
            }
        });
    });
}
