var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var last, count;
    count = 0;
    data.split('\n').map(Number).forEach(s => {
        if (last) {
            if (parseInt(s) > last) { count++ };
        }
        last = parseInt(s);
    }
    )
    console.log('larger count: %d', count);
});

