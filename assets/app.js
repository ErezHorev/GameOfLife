"use strict";

var debug = false; // in case 'true', adds logs to console. for debug purposes

const defaults = {
    rows: 70,
    lines: 70,
    pattern: 'gameoflife'
};

/**
 * Game Of Life object constructor
 * @constructor
 * @param {int} rows - Game's board(grid) rows
 * @param {int} lines - Game's board(grid) lines
 * @param {array} pattern - initial pattern to paint on board
 */
function GameOfLife(rows, lines, pattern) {
    console.log("creating new game");
    var newGame = {
        canvas: setupCanvas(rows, lines),
        grid: [],
        pattern: [],
        rows: rows,
        lines: lines,
        isRunning: 0,
        // methods
        init: init,
        tick: tick,
        start: start,
        stop: stop,
        playIntro: playIntro,
        drawCell: drawCell,
        setupGrid: setupGrid,
        setPattern: setPattern,
    };
    newGame.init();
    newGame.setPattern(allPatterns[pattern || 'clear']);
    return newGame;
}

/**
 * init game's state on grid
 * @memberof GameOfLife
 */
function init() {
    this.grid = setupGrid(this.rows, this.lines, this.pattern);
    draw(this.canvas, this.grid);
}

/**
 * Starts game
 * @memberof GameOfLife
 */
function start() {
    if (!this.isRunning) {
        console.log("Running game ...")
        this.tick();
    };
}

/**
 * Stops game
 * @memberof GameOfLife
 */
function stop() {
    console.log("Stopping game ...");
    clearInterval(this.isRunning);
    this.isRunning = 0;
    this.init();
}

/**
 * update the game's grid asynchronously.
 * @memberof GameOfLife
 */
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

/**
 * play game's intro
 * @memberof GameOfLifes
 */
function playIntro() {
    var pattern = allPatterns['gameoflife'].get();
    pattern.sort(() => Math.random() * 2 - 1); //randomizing pattern

    var interval = 50,
        canvas = this.canvas,
        grid = this.grid,
        runId = 0;

    var runStep = function () {
        var slice = [],
            done = false;

        for (var i = 0; i < 20; i++) {
            let cell = pattern.pop();
            if (cell === undefined) {
                clearInterval(runId);
                break;
            };
            slice.push(cell);
        }

        populateGrid(grid, slice);
        draw(canvas, grid);
    };

    runId = setInterval(runStep, interval);
    fadeInButtons();
}

/**
 * Draws a single cell on game's grid.
 * Used for manual paint on grid by user.
 * @param {int} x 
 * @param {int} y 
 * @memberof GameOfLife
 */
function drawCell(x, y) {
    x = Math.floor(x / cellSize);
    y = Math.floor(y / cellSize);
    if (x < 0 || y < 0) {
        return // noop - out of canvas boundaries
    }
    this.grid[x][y] = 1
    draw(this.canvas, this.grid)
};

/**
 * Sets pattern property (later to be set on game's grid)
 * @param {array} pattern 
 * @memberof GameOfLife
 */
function setPattern(pattern) {
    this.pattern = pattern.get();
}

//// Service functions ////
function assert(condition, message) { if (!condition) { throw message; }; }
function log(msg) { if (debug) { console.log(debug) }; }

function fadeInButtons() {
    var transitionTimeMS = 5000
    $("#gameCanvas").fadeIn("slow");
    $("#title").fadeIn(transitionTimeMS);
    $("#patternSelector").fadeIn(transitionTimeMS);
    $("#patternLbl").fadeIn(transitionTimeMS);
    $("#startBtn").fadeIn(transitionTimeMS);
}
