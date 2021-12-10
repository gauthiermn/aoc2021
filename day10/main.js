var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    const scoring = [
        { char: ')', value: 3 },
        { char: ']', value: 57 },
        { char: '}', value: 1197 },
        { char: '>', value: 25137 },
        { char: '(', value: 1 },
        { char: '[', value: 2 },
        { char: '{', value: 3 },
        { char: '<', value: 4 }
    ]

    function isMatch(closechar, openchar) {
        return (openchar == '[' && closechar == ']')
            || (openchar == '{' && closechar == '}')
            || (openchar == '(' && closechar == ')')
            || (openchar == '<' && closechar == '>')
    }

    function getScore(char) { return scoring.find(c => c.char == char).value; }

    var lines = data.split('\r\n');

    var invalidscore = 0;
    var acscores = [];
    var validlines = [];
    for (let i = (lines.length - 1); i >= 0; i--) {
        const e = lines[i].split('');
        var p = [];
        var incomp = false;
        for (let j = 0; j < e.length; j++) {
            switch (e[j]) {
                case '[': case '{': case '(': case '<':
                    p.push(e[j]);
                    break;

                case ']': case '}': case ')': case '>':
                    var open = p.pop();
                    if (!isMatch(e[j], open)) {
                        invalidscore += getScore(e[j], true); incomp = true; break;
                    }

                    break;

                default:
                    break;
            }
        }
        //store stacks
        if (!incomp) { validlines.push(p); }
    }

    for (let i = (validlines.length - 1); i >= 0; i--) {
        var acscore = 0;
        var p = validlines[i];
        for (let j = (p.length - 1); j >= 0; j--) {
            var open = p.pop();
            acscore = acscore * 5 + getScore(open);
        }
        acscores.push(acscore);
    }

    console.log('Part 1 Score: %d', invalidscore);
    console.log('Part 2 Score: %d', acscores.sort((p, c) => p - c)[Math.floor(acscores.length / 2)]);
});