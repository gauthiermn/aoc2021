var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var last, current, count;
    count = 0;
    var d = data.split('\n').map(Number);

    for (let i = 0 + 2; i < d.length - 1; i++) {
        current = (d[i] + d[i - 1] + d[i - 2]);
        if (last && (current > last)) { count++; }
        last = current;
    }

    console.log('larger sum ount: %d', count);
});

