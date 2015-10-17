if (typeof require !== 'undefined') {
    Action = require('../src/Action.js').Action;
}
var TicTacToe = (function() {

    return function() {
        var that = {};
        var field = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        var player = 1;
        var gameOver = false;
        var winner = 0;
        var moves = [];

        var lines = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],

            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],

            [[0,0], [1,1], [2,2]],
            [[2,0], [1,1], [0,2]]
        ];


        var isDraw = function() {
            return field.every(function(line) {
                return line.every(function(spaceContent) {
                    return spaceContent !== 0;
                });
            });
        };

        var populateLine = function(line, value) {
            line.forEach(function(space) {
                var row = space[0];
                var col = space[1];

                field[row][col] = value;
            });
        };

        var getWinningLine = function() {
            var winningLine = null;

            lines.forEach(function(line) {
                var row = line[0][0];
                var col = line[0][1];

                var player = field[row][col];

                var isWinning = false;
                
                if (player === 0) {
                    return;
                }

                isWinning = line.every(function(space) {
                    var row = space[0];
                    var col = space[1];

                    return player === field[row][col];
                });

                if (isWinning) {
                    winningLine = line;
                }
            });

            return winningLine;
        };

        var getWinningMark = function(player) {
            if (player === 1) {
                return 11;
            }
            else {
                return 22;
            }
        };

        var switchPlayer = function() {
            if (player === 1) {
                player = 2;
            }
            else {
                player = 1;
            }
        };

        that.getField = function() {
            return field;
        };

        that.getPlayer = function() {
            return player;
        };

        that.put = function(space) {
            if (that.isOver()) {
                return [Action.empty()];
            }

            var row = space[0];
            var col = space[1];

            if (field[row][col] !== 0) {
                return [Action.empty()];
            }

            field[row][col] = player;

            moves.push([row, col]);

            var lastPlayer = player;

            if (that.isOver()) {
                winner = player;
                return [
                    Action({
                        space: space,
                        token: lastPlayer,
                        result: 'ongoing'
                    }),
                    Action({
                        result: 'victory',
                        victor: lastPlayer,
                        victoryLine: getWinningLine()
                    }),
                ];
            }


            switchPlayer();

            return [Action({
                space: space,
                token: lastPlayer,
                result: 'ongoing'
            })];
        };

        that.isOver = function() {
            if (gameOver) {
                return true;
            }

            var winningLine = getWinningLine();

            if (winningLine !== null) {
                gameOver = true;

                populateLine(winningLine, getWinningMark(player));
            }
            else if (isDraw()){
                gameOver = true;
            }

            return gameOver;
        };

        that.getWinner = function() {
            return winner;
        };

        that.getMoves = function() {
            return moves;
        };


        return that;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {TicTacToe : TicTacToe};
}
