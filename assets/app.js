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
        stop: stop,
        playIntro: playIntro,
        drawCell: drawCell,
        setupGrid: setupGrid,
        setPattern: setPattern,
    };
    newGame.init();
    newGame.setPattern(allPatterns[pattern]);
    return newGame;
}

function init() {
    this.grid = setupGrid(this.rows, this.lines, this._pattern);
    draw(this.canvas, this.grid);
}

function start() {
    if (!this.isRunning) {
        console.log("Running game ...")
        this.tick();
    };
}

function stop() {
    console.log("Stopping game ...");
    clearInterval(this.isRunning);
    this.isRunning = 0;
    this.init();
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

function playIntro() {
    var pattern = allPatterns['gameoflife'].get();
    pattern.sort(() => Math.random() * 2 - 1); //randomizing pattern

    var interval = 100,
        canvas = this.canvas,
        grid = this.grid,
        runId = 0;

    var runStep = function () {
        var slice = [],
            done = false;

        for (var i = 0; i < 20; i++) {
            let cell = pattern.pop();
            if (cell == undefined) {
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
 * 'drawCell' draws a single cell on game's grid.
 * Used for manual paint on grid by user.
 * @param {*} x 
 * @param {*} y 
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

function setPattern(pattern) {
    this._pattern = pattern.get();
}

//// Service functions ////
function assert(condition, message) { if (!condition) { throw message; }; }
function log(msg) { if (debug) { console.log(debug) }; }

function fadeInButtons() {
    var transitionTimeMS = 7000
    $("#title").fadeIn(transitionTimeMS);
    $("#patternSelector").fadeIn(transitionTimeMS);
    $("#patternLbl").fadeIn(transitionTimeMS);
    $("#startBtn").fadeIn(transitionTimeMS);
}
