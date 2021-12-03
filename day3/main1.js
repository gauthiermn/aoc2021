var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var depth = 0, position = 0;

    var d = data.split('\n');
    /* .map(s => {
        return parseInt(s, 2)
    });*/
    var a = [];
    for (let i = 0; i < 12; i++) {
        var v = d.reduce((p, c) => {
            if (c.slice(i, i + 1) === '0') { return p + 1 } else { return p - 1 };
        }, 0);
        if (v > 0) { v = '1' } else { v = '0' }
        a.push(v);
    }
    console.log(a.join(""));

    var gamma = parseInt(a.join(""), 2);
    console.log(a.map(s => { if (s === '1') { return '0' } else { return '1' } }).join(""));
    var eps = parseInt(a.map(s => { if (s === '1') { return '0' } else { return '1' } }).join(""), 2);


    console.log(gamma);
    console.log(eps);
    console.log(eps * gamma);

});