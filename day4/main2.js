var fs = require('fs'), filename = 'input.txt';
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    Object.defineProperty(Array.prototype, 'flat', {
        value: function (depth = 1) {
            return this.reduce(function (flat, toFlatten) {
                return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
            }, []);
        }
    });
    var depth = 0, position = 0;

    var d = data.split('\n');

    var numbers = d[0].replace('\r', '').split(',');

    //build boards
    var boards = [];
    for (let i = 2; i < d.length; i = i + 6) {
        var b = [];
        for (let j = 0; j < 5; j++) {
            b.push(d[i + j].replace('\r', '').trim().split(/\ +/));
        }
        boards.push(b);
    }

    var winningBoard, winningBoardIdx, nIdx;
    for (let nc = 0; nc < numbers.length; nc++) {
        for (let bc = 0; bc < boards.length; bc++) {
            const bd = boards[bc];
            if (checkBoard(bd, numbers.slice(0, nc))) {
                if (boards.length > 1 ) {
                    boards.splice(bc,1);
                } else {
                    winningBoard = bd;
                    winningBoardIdx = bc;
                    nIdx = nc;
                    break;
                }
            }
        };

        if (winningBoard) { break }
    }

    // console.log(winningBoard);
    // console.log(winningBoardIdx);
    // console.log(nIdx);

    var calledNumbers = numbers.slice(0, nIdx);
    var uncalledNumbers = winningBoard.flat().filter(wn => !calledNumbers.includes(wn));
    var sumUncalled = uncalledNumbers.reduce((p, c) => parseInt(p) + parseInt(c));
    var lastCalled = parseInt(numbers[nIdx-1]);
    
    console.log(calledNumbers);
    console.log(uncalledNumbers);
    console.log(sumUncalled);
    console.log(lastCalled);
    console.log('product: %d', sumUncalled * lastCalled);
    console.log(winningBoard);

    // console.log(numbers);
    // console.log(boards);

});

function checkBoard(b, numbers) {

    for (let x = 0; x < 5; x++) {
        const chk = b[x].filter(value => numbers.includes(value));
        if (chk.length == 5) { return true }
    }
    for (let y = 0; y < 5; y++) {
        var na = [];

        for (let row = 0; row < 5; row++) { na.push(b[row][y]); }
        const chk = na.filter(value => numbers.includes(value));
        
        if (chk.length == 5) { 
        console.log(na);
            return true 
        }

    }

    return false;
}