var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var grid = [];
    var rows = data.split('\r\n');
    var points = [];
    var instr = [];
    var part = false;
    for (let r = 0; r < rows.length; r++) {
        if (rows[r] == '') {
            part = !part;
        } else {
            if (part) {
                instr.push(rows[r]);
            } else {
                points.push({ x: parseInt(rows[r].split(',')[0]), y: parseInt(rows[r].split(',')[1]) });
            }
        }
    }
    var xmax = Math.max(...points.map(p => p.x)) + 1;
    var ymax = Math.max(...points.map(p => p.y)) + 1;
    var xf = xmax, yf = ymax;

    for (let j = 0; j < instr.length; j++) {
        const element = instr[j];
        var inst = instr[j].split('=');
        if (inst[0] == 'fold along x') {
            xf = (xf - 1) / 2;
            performFold(false, inst[1], points);
        } else {
            yf = (yf - 1) / 2;
            performFold(true, inst[1], points);
        }
        var uniqueValues = [];
        points.forEach((obj) => {
            if (!uniqueValues.find(p => p.x == obj.x && p.y == obj.y)) {
                uniqueValues.push({ x: obj.x, y: obj.y });

            }
        });
        if (j == 0) { console.log('Step: %d / Point Count: %d', j + 1, uniqueValues.length); }

    };

    for (let r = 0; r < (yf + 1); r++) {
        var line = '';
        for (let c = 0; c < (xf + 1); c++) {
            if (points.find(p => p.x == c && p.y == r)) { line += '█'; } else { line += ' ' }
        }
        console.log(line);
    }

    function performFold(xfold, idx, points) {
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (xfold) {
                //x will be unchanged
                if (p.y > idx) { p.y -= 2 * (p.y - idx); }
            } else {
                //y will be unchanged
                if (p.x > idx) { p.x -= 2 * (p.x - idx); }
            }
        }
    }
});