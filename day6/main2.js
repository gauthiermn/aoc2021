var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var daycount = 256;
    var ca = [0, 0, 0, 0, 0, 0, 0];
    var caLast = [0, 0, 0, 0, 0, 0, 0];
    var caTimer = [0, 0, 0, 0, 0, 0, 0];
    var fish = data.split(',').map(Number);
    fish.forEach(f => { ca[f - 1]++ });
    // console.log(ca);

    for (let day = 1; day < (daycount + 2); day++) {
        var idx = (day + 1) % 7;
        var cpidx = (day + 6) % 7;
        caLast[idx] = ca[cpidx];
        caTimer[idx] = 2;
        for (let t = 0; t < caLast.length; t++) {
            if ((caLast[t] > 0) && (caTimer[t] <= 0)) {
                ca[t] += caLast[t];
                caLast[t] = 0;
                caTimer[t] = 0;
            }
            if (caTimer[t] > 0) { caTimer[t]--; }

        }
        // console.log('day %d idx = %d cpidx = %d total = %d last = %d', day, idx, cpidx, ca.reduce((p, c) => p + c), caLast[idx]);
        // console.log(ca);
        // console.log(caLast);
        // console.log(caTimer);
        // console.log('---');
    }
    // console.log(ca);
    var sum = ca.reduce((p, c) => p + c);
    console.log('day %d count = %d ', daycount, sum);

});