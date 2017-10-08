"use strict";

function game(canvas) {
    console.log("creating new game");
    this.canvas = setupCanvas(canvas);
    this.grid = [];

    this.start = start;
    this.tick = tick;
    this.update = update;
}

function setupCanvas(canvas) {
    canvas.ctx = canvas.getContext('2d')
    canvas.ctx.strokeStyle = 'lightgray';
    canvas.ctx.fillStyle = 'black';
    return canvas
}

function start() {
    var rows = 100;
    var lines = 100;
    this.grid = initCells(rows, lines);
    this.tick();
}

function initCells(rows, lines) {
    console.log("Initializing cells on:", rows, "rows", "and", lines, "lines")

    var grid = [[]];
    for (var row = 0; row < rows; row++) {
        grid[row] = [];
        for (var line = 0; line < lines; line++) {
            grid[row][line] = 0;
        };
    };

    // set initial state
    // TODO: parameterize initial pattern and add more patterns
    gosperGliderGun().forEach(function (coordinates) {
        var x = coordinates[0], y = coordinates[1];
        grid[x][y] = 1;
    });

    return grid
}

function tick() {
    var interval = 50; //TODO: parameterize for user control
    var canvas = this.canvas;
    var grid = this.grid;

    var drawAndUpdate = function () {
        draw(canvas, grid)
        grid = update(grid)
    };

    setInterval(drawAndUpdate, interval);
}

function draw(canvas, grid) {
    console.log("Drawing on canvas...");

    var cellSize = 10;
    canvas.ctx.clearRect(0, 0, 1512, 512);
    // TODO: consider transforming this to some 'walk' method on cells (maybe rename 'cells' to 'grid'/'world'/'board'?)
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

function update(grid) {
    console.log("Updating cells...");
    var newGrid = [];

    grid.forEach(function (row, x) {
        newGrid[x] = [];

        row.forEach(function (cellValue, y) {
            // game rules:
            // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
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

function findNeighbours(x, y, grid) {
    var up = y - 1,
        down = y + 1,
        right = x + 1,
        left = x - 1;

    function knockKnock(x, y) {
        return grid[x] && grid[x][y];
    }
    // looking for close neighbours
    var neighboursCount = 0;
    // upper line
    neighboursCount += knockKnock(x, up) ? 1 : 0;
    neighboursCount += knockKnock(left, up) ? 1 : 0;
    neighboursCount += knockKnock(right, up) ? 1 : 0;
    // current line
    neighboursCount += knockKnock(left, y) ? 1 : 0;
    neighboursCount += knockKnock(right, y) ? 1 : 0;
    // lower line
    neighboursCount += knockKnock(x, down) ? 1 : 0;
    neighboursCount += knockKnock(left, down) ? 1 : 0;
    neighboursCount += knockKnock(right, down) ? 1 : 0;

    return neighboursCount
}

// patterns
function gosperGliderGun() {
    return [
        [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4],
        [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4],
        [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4],
        [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1],
        [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],
    ]
}