var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;

    //var steps = 10;
    var steps = 40;

    var rows = data.split('\r\n');
    var startchain = rows[0].split('');
    var counters = [];
    for (let r = 2; r < rows.length; r++) {
        var line = rows[r].split(' -> ');
        counters.push({
            code: line[0],
            add: line[1],
            count: 0,
            tobeadded: 0
        })
    }

    for (let i = 0; i < (startchain.length - 1); i++) {
        var m = counters.find(c => c.code == startchain[i] + startchain[i + 1]);
        m.count++;
    }

    //console.table(counters);

    for (let s = 0; s < steps; s++) {

        for (let i = 0; i < counters.length; i++) {
            var m = counters[i];
            if (m.count > 0) {
                counters.find(c => c.code == m.code.charAt(0) + m.add).tobeadded += m.count;
                counters.find(c => c.code == m.add + m.code.charAt(1)).tobeadded += m.count;
            }
        }
        counters.forEach(m => { m.count = m.tobeadded; m.tobeadded = 0; })
    }

    //console.table(counters);

    var ecount = [];
    counters.forEach(m => {
        var tgt = ecount.find(e => e.elem == m.code.charAt(1))
        if (tgt) {
            tgt.count += m.count;
        } else {
            ecount.push({ elem: m.code.charAt(1), count: m.count })
        }
    })

    // add back first letter of startchain
    ecount.find(e => e.elem == startchain[0]).count++;
    ecount.sort((a, b) => (a.count > b.count) ? 1 : -1)
    console.table(ecount);
    console.log(ecount.pop().count - ecount[0].count);

});