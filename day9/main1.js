var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var grid = [];

    var rows = data.split('\r\n');
    for (let r = 0; r < rows.length; r++) {
        grid[r] = [];
        grid[r] = rows[r].split('').map(Number);
    }

    var risk = 0;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            var comp = grid[i][j];
            var cond1, cond2, cond3, cond4;
            cond1 = (i != 0) ? comp < grid[i - 1][j] : true;
            cond2 = (j != 0) ? comp < grid[i][j - 1] : true;
            cond3 = (i < (rows.length - 1)) ? comp < grid[i + 1][j] : true;
            cond4 = (j < (grid[0].length - 1)) ? comp < grid[i][j + 1] : true;
            //console.log('i %d j %d comp %d bool %d cond1 %d cond2 %d cond3 %d cond4 %d', i, j, comp, cond1 && cond2 && cond3 && cond4 ,cond1, cond2, cond3, cond4);
            if (cond1 && cond2 && cond3 && cond4) {
                //console.log(comp)
                risk += (comp + 1);
            }
        }
    }
    console.log('total risk: %d', risk);
    //console.log(grid);

});