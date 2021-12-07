var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var crabs = data.split(',').map(Number);
    var cmin = Math.min(...crabs);
    var cmax = Math.max(...crabs);
    totalfuel = [];
    for (let i = 0; i < cmax; i++) {
        totalfuel.push(crabs.reduce((p, c) => p + fuel(Math.abs(i - c)), 0))
    }
    console.log('Minimum Fuel: ', Math.min(...totalfuel));
});

function fuel(c) {
    var fuel = 0;
    for (let f = c; f > 0; f--) { fuel += f }
    return fuel;
}