var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var grid = [];
    var rows = data.split('\r\n');
    //prepare matrix
    for (var r = 0; r < rows.length; r++) {
        grid[r] = [];
        grid[r] = rows[r].split('').map(Number);
    }

    var totalRows = grid.length;
    var totalColumns = grid[0].length;
    for (var i = 0; i < totalRows; i++) { for (var j = 0; j < totalColumns; j++) { grid[i][j] = (grid[i][j] < 9) ? 1 : 0; } }

    var sizeCount = [];
    var localCount = 0;

    for (var i = 0; i < totalRows; i++) {
        for (var j = 0; j < totalColumns; j++) {
            if (grid[i][j] == 1) {
                localCount = 0;
                grid[i][j] = 0;
                localCount++;
                // left, right, up, down
                localCount += depthfirstsearch(grid, i - 1, j, totalRows, totalColumns);
                localCount += depthfirstsearch(grid, i + 1, j, totalRows, totalColumns);
                localCount += depthfirstsearch(grid, i, j - 1, totalRows, totalColumns);
                localCount += depthfirstsearch(grid, i, j + 1, totalRows, totalColumns);
                sizeCount.push(localCount);
            }
        }
    }

    sizeCount.sort((p, c) => c - p);
    console.log('Part 2: %d', sizeCount.slice(0, 3).reduce((p, c) => p * c));

    function depthfirstsearch(grid, i, j, totalRows, totalColumns) {
        // Check bounds and for 0
        if (i < 0 || j < 0 || i > (totalRows - 1) || j > (totalColumns - 1) || grid[i][j] != 1) {
            return 0;
        }

        if (grid[i][j] == 1) {
            grid[i][j] = 0;
            var localCount = 1;
            // left, right, up, down
            localCount += depthfirstsearch(grid, i - 1, j, totalRows, totalColumns);
            localCount += depthfirstsearch(grid, i + 1, j, totalRows, totalColumns);
            localCount += depthfirstsearch(grid, i, j - 1, totalRows, totalColumns);
            localCount += depthfirstsearch(grid, i, j + 1, totalRows, totalColumns);
            return localCount;
        }
    }
});