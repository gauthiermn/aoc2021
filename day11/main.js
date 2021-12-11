var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var part1steps = 100;
    var part2maxsteps = 500;
    var grid = [];
    var rows = data.split('\r\n');
    for (let r = 0; r < rows.length; r++) {
        grid[r] = [];
        grid[r] = rows[r].split('').map(Number);
    }
    //console.table(grid);

    var sumFlashes = 0;
    var syncStep = -1;
    for (let t = 0; t < part2maxsteps; t++) {
        var stepFlashes = runstep(grid);
        if (t < part1steps) { sumFlashes += stepFlashes; }
        if (stepFlashes == (rows.length * grid[0].length)) {
            syncStep = t + 1
            break;
        }
        // console.log('step %d', t);
        // console.table(grid);
    }

    console.log('Part 1: %d', sumFlashes);
    console.log('Part 2: %d', syncStep);
    //end

    function chargesLeft(grid) {
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] > 9) { return true };
            }
        }
        return false;
    }

    function runstep(grid) {
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                grid[i][j]++;
            }
        }

        var flashes = 0;
        while (chargesLeft(grid)) {

            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[0].length; j++) {
                    if (grid[i][j] > 9) {
                        grid[i][j] = -1;
                        for (let dx = (i > 0 ? -1 : 0); dx <= (i < (rows.length - 1) ? 1 : 0); ++dx) {
                            for (let dy = (j > 0 ? -1 : 0); dy <= (j < (grid[0].length - 1) ? 1 : 0); ++dy) {
                                if (dx != 0 || dy != 0) {
                                    if (grid[i + dx][j + dy] >= 0) {
                                        grid[i + dx][j + dy]++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        //reset flashes and count
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == -1) { grid[i][j]++; flashes++; };
            }
        }
        return flashes;

    }

});