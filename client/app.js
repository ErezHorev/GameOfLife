
function game(canvas) {
    console.log("creating new game");
    this.canvas = setupCanvas(canvas);
    this.grid = [];
    // methods
    this.start = start;
    this.tick = tick;
    this.draw = draw;
    this.update = update;
}

function setupCanvas(canvas) {
    canvas.ctx = canvas.getContext('2d')
    canvas.ctx.strokeStyle = 'lightgray';
    canvas.ctx.fillStyle = 'black';
    return canvas
}

function start() {
    // rows = this.canvas.attributes.height.value
    // lines = this.canvas.attributes.width.value
    rows = 100
    lines = 100
    this.grid = initCells(rows, lines);
    this.tick()
}

function tick() {
    var interval =  1000; //TODO: parameterize for user control
    var canvas = this.canvas
    var grid = this.grid
    var drawAndUpdate = function(){
        draw(canvas,grid)
        update(grid)
    }
    setInterval(drawAndUpdate, interval);
}

function initCells(rows, lines) {
    // TODO: support common patterns like glider gun...etc
    console.log("Initializing cells on:", rows, "rows", "and", lines, "lines")

    var grid = [[]];
    for (row = 0; row < rows; row++) {
        grid[row] = [];
        for (line = 0; line < lines; line++) {
            grid[row][line] = 0;
        }
    }

    // set initial state
    // TODO: parameterize initial pattern 
    getGliderGun().forEach(function (coordinates) {
        var x = coordinates[0], y = coordinates[1];
        grid[x][y] = 1;
    });

    return grid
}

function draw(canvas, grid) {
    console.log("Drawing on canvas...");
    // var canvas = this.canvas
    // var grid = this.grid
    var cellSize = 10;
    // TODO: transform this to some 'walk' method on cells (maybe rename 'cells' to 'grid'/'world'/'board'?)
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
}

function getGliderGun() {
    return [
        // Gosper glider gun
        [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4],
        [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4],
        [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4],
        [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1],
        [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],
    ]
}
