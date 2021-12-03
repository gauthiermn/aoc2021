var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    var d = data.split('\n');
    var oxy, co2;

    oxy = findSingleReading(d, true);
    co2 = findSingleReading(d, false);

    console.log('Oxygen: %d', oxy);
    console.log('CO2: %d', co2);
    console.log('Product: %d', oxy * co2);

});

function findSingleReading(data, high) {
    var v;
    for (let i = 0; i < 12; i++) {
        v = data.reduce((p, c) => { if (c.slice(i, i + 1) === '0') { return p + 1 } else { return p - 1 } }, 0);
        if (v > 0) { v = high ? '1' : '0' } else { v = high ? '0' : '1' }
        data = data.filter(s => s.slice(i, i + 1) === v);
        if (data.length === 1) { return parseInt(data[0], 2) }
    }
}
