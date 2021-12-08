var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var lines = data.split('\n');
    var gtotal = 0;
    for (let i = 0; i < lines.length; i++) {
        var digits = lines[i].split('|')[0].trim().split(' ');
        var display = lines[i].split('|')[1].trim().split(' ');
        var digitArray = determineDigitArray(digits);
        var total = '';
        for (let i = 0; i < display.length; i++) {
            var digit = display[i].split('').sort().join('');
            total += digitArray.findIndex(d => d === digit);
        }
        gtotal += parseInt(total);
    }
    console.log('Grand Total: %d', gtotal);
});

function determineDigitArray(digits) {
    //  000
    // 1   2
    // 1   2
    //  333
    // 4   5
    // 4   5
    //  666

    // (segment) 'digit'
    // '1' is length 2, right-most segments
    // '7' is length 3, right-most segments and differnt one is top segment (0)
    // '4' is length 4, right-most segments and different two are (1) and (3)
    // '2/3/5' are length 5, will share (0)(3)(6).
    // '3' shares 2 right-most segments with '1'
    // find intersection of '3' and '1', these will be (0)(3)(6)
    // '0/6/9' are length 6
    // '0' will be the one with (3)
    // we now have two sets '2/5' and '6/9'
    // '9' will be the one that intersects '1'
    // '6' is the remaining one in '0/6/9'
    // 6 will contain '5' but not 2 
    // '2' is the remaining one in '2/3/5'

    var digitlength = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
    var sol = ['', '', '', '', '', '', '', '', '', ''];
    sol[1] = digits.find(d => d.length === digitlength[1]);
    sol[4] = digits.find(d => d.length === digitlength[4]);
    sol[7] = digits.find(d => d.length === digitlength[7]);
    sol[8] = digits.find(d => d.length === digitlength[8]);

    var two35 = digits.filter(d => d.length === digitlength[2]);
    sol[3] = two35.find(m => chkStrContains(sol[1], m));
    two35 = remove(two35, sol[3]);
    var hzSegs = diff(sol[3], sol[1]);
    var zero69 = digits.filter(d => d.length === digitlength[0]);
    sol[0] = zero69.find(m => !chkStrContains(hzSegs, m));
    zero69 = remove(zero69, sol[0]);
    sol[9] = zero69.find(m => chkStrContains(sol[1], m))
    zero69 = remove(zero69, sol[9]);
    sol[6] = zero69[0];
    sol[5] = two35.find(m => chkStrContains(m, sol[6]));
    two35 = remove(two35, sol[5]);
    sol[2] = two35[0];

    sol = sol.map(s => s.split('').sort().join(''));
    return sol;
}

function chkStrContains(subset, compare) {
    var cs = compare.split('');
    return subset.split('').every(s => cs.includes(s));
}

function intersect(string1, string2) {
    var s2 = string2.split('');
    return string1.split('').filter(s => s2.includes(s)).join('');;
}

function diff(string1, string2) {
    var s2 = string2.split('');
    return string1.split('').filter(s => !s2.includes(s)).join('');;
}

function remove(arr, value) {
    return arr.filter(s => s !== value)
}