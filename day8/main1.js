var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var digits = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

    var lines = data.split('\n');
    var total = 0;
    for (let i = 0; i < lines.length; i++) {
        const result = lines[i].split('|')[1].trim();
        console.log(result)
        result.split(' ').forEach(n => {
            
            if (n.length == 2 || n.length == 4 || n.length == 3 || n.length == 7) { 
                console.log(n)
                total++;
            }
        })
        console.log('total: %d ', total);
    }
    console.log('total: %d ', total);

});