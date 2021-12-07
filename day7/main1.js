var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var crabs = data.split(',').map(Number);
    var cmin = Math.min(...crabs);
    var cmax = Math.max(...crabs);
    totalfuel = [];
    for (let i = 0; i < cmax; i++) {
        totalfuel.push(crabs.reduce((p, c) => p + Math.abs(i - c), 0))
    }
    console.log('Minimum Fuel: ', Math.min(...totalfuel));

});