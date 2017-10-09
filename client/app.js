"use strict";

/**
 * game constructor
 * @param {*} canvas
 */
function game(canvas) {
    console.log("creating new game");
    this.canvas = setCanvasCtx(canvas);
    this.grid = []
    this._intervalID;

    // methods
    this.start = start;
    this.reset = reset;
    this.setupGrid = setupGrid
    this.tick = tick;
    this.update = update;
}

/**
 * 'setCanvasCtx' setups the canvas context and binds it to the canvas object
 * @param {*} canvas
 */
function setCanvasCtx(canvas) {
    canvas.ctx = canvas.getContext('2d')
    canvas.ctx.strokeStyle = 'lightgray';
    canvas.ctx.fillStyle = 'black';
    return canvas
}

function setupGrid(rows, lines) {
    this.grid = new grid(rows, lines);
}

function start() {
    this.tick();
}
function reset() {
    clearInterval(this._intervalID)
    this.grid = initGrid(this.grid.length, this.grid[0].length)
    draw(this.canvas, this.grid)
}

function tick() {
    var interval = 20, //TODO: maybe parameterize for user control
        canvas = this.canvas,
        grid = this.grid;

    var drawAndUpdate = function () {
        draw(canvas, grid)
        grid = update(grid)
    };

    this._intervalID = setInterval(drawAndUpdate, interval);
}

/**
 * grid constructor
 * @param {*} rows
 * @param {*} lines
 */
function grid(rows, lines) {
    console.log("Initializing cells on:", rows, "rows", "and", lines, "lines")
    var grid = initGrid(rows, lines)

    // set initial state
    // TODO: parameterize initial pattern and add more patterns
    gosperGliderGun().forEach(function (coordinates) {
        var x = coordinates[0], y = coordinates[1];
        if (grid[x] != undefined && grid[x][y] != undefined) {
            grid[x][y] = 1;
        };
    });

    return grid
}

function initGrid(rows, lines) {
    var grid = [[]]
    for (var row = 0; row < rows; row++) {
        grid[row] = [];
        for (var line = 0; line < lines; line++) {
            grid[row][line] = 0;
        };
    };
    return grid
}
/**
 * 'draw' is drawing the current grid values on given canvas.
 * @param {*} canvas
 * @param {*} grid
 */
function draw(canvas, grid) {
    console.log("Drawing on canvas...");
    var cellSize = 8;
    canvas.ctx.clearRect(0, 0, 1512, 1512);

    grid.forEach(function (row, x) {
        row.forEach(function (cell, y) {
            canvas.ctx.beginPath();
            canvas.ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
            if (cell) {
                canvas.ctx.fill();
            } else {
                canvas.ctx.stroke();
            }
        });
    });
    console.log("Done drawing on canvas...");
}

/**
'update' will return an updated game board(grid)
see game rules at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules
 */
function update(grid) {
    console.log("Updating cells...");
    var newGrid = [];

    grid.forEach(function (row, x) {
        newGrid[x] = [];
        row.forEach(function (cellValue, y) {
            var alive = 0;
            switch (findNeighbours(x, y, grid)) {
                case 2:
                    alive = (cellValue > 0) ? 1 : 0
                    break;
                case 3:
                    alive = 1
            }
            newGrid[x][y] = alive;
        });
    });
    return newGrid
}

/**
 * 'findNeighbours' returns the amount of nearby members
 * of the target cell at [x,y] point on grid.
 * @param {*} x
 * @param {*} y
 * @param {*} grid
 */
function findNeighbours(x, y, grid) {
    var up = y - 1,
        down = y + 1,
        right = x + 1,
        left = x - 1;

    function knocKnock(x, y) {
        return grid[x] && grid[x][y];
    }

    var neighboursCount = 0;
    // upper line
    neighboursCount += knocKnock(x, up) ? 1 : 0;
    neighboursCount += knocKnock(left, up) ? 1 : 0;
    neighboursCount += knocKnock(right, up) ? 1 : 0;
    // current line
    neighboursCount += knocKnock(left, y) ? 1 : 0;
    neighboursCount += knocKnock(right, y) ? 1 : 0;
    // lower line
    neighboursCount += knocKnock(x, down) ? 1 : 0;
    neighboursCount += knocKnock(left, down) ? 1 : 0;
    neighboursCount += knocKnock(right, down) ? 1 : 0;

    return neighboursCount
}

//// PATTERNS ////

/**
 * Gosper's Glider Gun pattern
 */
function gosperGliderGun() {
    return [
        [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4],
        [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4],
        [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4],
        [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1],
        [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],
    ]
}