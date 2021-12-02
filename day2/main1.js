var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var depth = 0, position = 0;

    var d = data.split('\n').map(s => {
        var p = s.split(' ');
        return {
            direction: p[0],
            value: parseInt(p[1])
        }
    });

    position = d.filter(f => f.direction === 'forward').reduce((p, c) => p + c.value, 0);
    depth += d.filter(f => f.direction === 'down').reduce((p, c) => p + c.value, 0);
    depth -= d.filter(f => f.direction === 'up').reduce((p, c) => p + c.value, 0);
    
    console.log('position: %d, depth: %d', position, depth);
    console.log('total (p*d): %d', position * depth);
});