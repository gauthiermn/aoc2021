var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var depth = 0, position = 0;

    var d = data.split('\n');
    var lines = [];
    d.forEach(s => {
        var line = s.split(/ -> /);
        var pt1 = { x: parseInt(line[0].split(',')[0]), y: parseInt(line[0].split(',')[1]) };
        var pt2 = { x: parseInt(line[1].split(',')[0]), y: parseInt(line[1].split(',')[1]) };
        if (pt1.x === pt2.x || pt1.y === pt2.y) { lines.push({ pt1: pt1, pt2: pt2 }); }
    })

    console.log(lines.length);

    var grid = Array(1000).fill().map(() => Array(1000).fill(0));
    lines.forEach(ln => {
        if (ln.pt1.x === ln.pt2.x) {
            if (ln.pt1.y < ln.pt2.y) {
                for (let y = ln.pt1.y; y < ln.pt2.y + 1; y++) { grid[ln.pt1.x][y]++ }
            } else {
                for (let y = ln.pt2.y; y < ln.pt1.y + 1; y++) { grid[ln.pt1.x][y]++ }
            }
        }
        if (ln.pt1.y === ln.pt2.y) {
            if (ln.pt1.x < ln.pt2.x) {
                for (let x = ln.pt1.x; x < ln.pt2.x + 1; x++) { grid[x][ln.pt1.y]++ }
            } else {
                for (let x = ln.pt2.x; x < ln.pt1.x + 1; x++) { grid[x][ln.pt1.y]++ }
            }
        }
        if ((ln.pt1.y != ln.pt2.y) && (ln.pt1.x === ln.pt2.x)) {

        }
    })
    var sum = 0;

    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            if (grid[i][j] > 1) { sum++; }
        }
    }
    console.log(sum);
});