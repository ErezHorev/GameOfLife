"use strict";

var debug = false; // in case 'true', adds logs to console

const defaults = {
    rows: 70,
    lines: 70,
    pattern: 'gameoflife'
};

/**
 * game constructor
 * @param {*} canvas
 */
function GameOfLife(rows, lines, pattern) {
    console.log("creating new game");
    var newGame = {
        canvas: setupCanvas(rows, lines),
        grid: [],
        _pattern: [],
        rows: rows,
        lines: lines,
        isRunning: 0,
        // methods
        init: init,
        tick: tick,
        start: start,
        pause: pause,
        stop: stop,
        drawCell: drawCell,
        setupGrid: setupGrid,
        setPattern: setPattern,
    };
    newGame.setPattern(allPatterns()[pattern]);
    newGame.init();
    return newGame;
}

function init() {
    this.setupGrid(this.rows, this.lines, this._pattern);
    draw(this.canvas, this.grid);
}

function pause() {
    clearInterval(this.isRunning);
    this.isRunning = 0;
}

function stop() {
    console.log("Stopping game ...");
    this.pause();
    this.init();
}

function start() {
    if (!this.isRunning) {
        console.log("Running game ...")
        this.tick();
    };
}

function tick() {
    var interval = 40, //TODO: parameterize for user to throttle speed
        canvas = this.canvas,
        grid = this.grid;

    var runStep = function () {
        draw(canvas, grid);
        grid = nextStep(grid);
    };

    this.isRunning = setInterval(runStep, interval);
}

function drawCell(x, y) {
    x = Math.floor(x / cellSize);
    y = Math.floor(y / cellSize);
    if (x < 0 || y < 0) {
        return // out of the canvas boundaries, do nothing
    }
    this.grid[x][y] = 1
    draw(this.canvas, this.grid)
};

function setPattern(pattern) {
    this._pattern = pattern.get();
}

function setupGrid(rows, lines, pattern) {
    try {
        // protect grid initialization
        assert((rows > 0 && lines > 0), `rows/lines must be larger than 0` +
            `(will start with defaults: rows=${defaults.rows}, lines=${defaults.lines})`);
    }
    catch (err) {
        rows = defaults.rows;
        lines = defaults.lines;
        console.log(`Error! ` + err);
    };
    // Using 'multiplier' to make our grid larger than the canvas size in order to give the notion
    // of infinite world. we can also loop the grid (see comment under 'knocKnock' function).
    var multiplier = 1.5;
    rows *= multiplier; lines *= multiplier;

    this.grid = new Grid(rows, lines, pattern);
}

/**
 * grid constructor (2 dimensional array).
 * all cells set with value '1' according to the pattern(coordinates), otherwise '0'.
 *
 * @param {*} rows
 * @param {*} lines
 * @param {*} pattern
 */
function Grid(rows, lines, pattern) {
    var grid = [[]];
    for (var row = 0; row < rows; row++) {
        grid[row] = [];
        for (var line = 0; line < lines; line++) {
            grid[row][line] = 0;
        };
    };
    return populateGrid(grid, pattern);
}

/**
 * 'populateGrid' sets the given pattern(coordinates) on given grid.
 * @param {*} grid
 * @param {*} pattern
 */
function populateGrid(grid, pattern) {
    pattern.forEach(function (coordinates) {
        var x = coordinates[0], y = coordinates[1];
        if (grid[x] === undefined || grid[x][y] === undefined) {
            return;
        };
        grid[x][y] = 1;
    });
    return grid;
}

const cellSize = 8;
/**
 * 'setupCanvas' setups the canvas context and binds it to
 * the canvas object.
 * @param {*} width
 * @param {*} height
 */
function setupCanvas(width, height) {
    var canvas = document.getElementById('gameCanvas')
    canvas.height = height * cellSize;
    canvas.width = width * cellSize;

    canvas.ctx = canvas.getContext('2d');
    canvas.ctx.strokeStyle = 'lightgray';
    canvas.ctx.fillStyle = 'black';
    return canvas;
}

/**
 * 'draw' is drawing the current grid values on given canvas.
 * @param {*} canvas
 * @param {*} grid
 */
function draw(canvas, grid) {
    log("Drawing on canvas...");
    // clear canvas before new draw
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    log("Done drawing on canvas...");
}

/**
 * 'nextStep' will return an updated grid(game board) after one step according
 * to the game's rules. see game rules at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules.
 *
 * @param {*} grid
 */
function nextStep(grid) {
    log("Running next step on grid...");
    var newGrid = [];

    grid.forEach(function (row, x) {
        newGrid[x] = [];
        row.forEach(function (cellValue, y) {
            var alive = 0;

            switch (findNeighbours(x, y, grid)) {
                case 2:
                    alive = (cellValue > 0) ? 1 : 0;
                    break;
                case 3:
                    alive = 1;
            };
            newGrid[x][y] = alive;
        });
    });
    return newGrid;
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
        // We can't really make an infinite world(grid) but we can loop our
        // arrays on grid by checking for neighbours on both ends of the grid.
        // (Note: its destructing Gosper's glider gun after few moments).
        // enable the next 2 lines to create the loop effect:
        // if (x < 0) { x += defaults.rows };
        // if (y < 0) { y += defaults.lines };
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

    return neighboursCount;
}

//// Service functions ////
function assert(condition, message) { if (!condition) { throw message; }; }
function log(msg) { if (debug) { console.log(debug) }; }
