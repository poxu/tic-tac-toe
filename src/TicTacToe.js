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

        that.getField = function() {
            return field;
        };

        that.getPlayer = function() {
            return player;
        };

        that.put = function(space) {
            if (that.isOver()) {
                return;
            }

            var row = space[0];
            var col = space[1];

            if (field[row][col] !== 0) {
                return;
            }

            field[row][col] = player;

            if (that.isOver()) {
                winner = player;
                return;
            }

            if (player === 1) {
                player = 2;
            }
            else {
                player = 1;
            }
        };

        that.isOver = function() {
            if (gameOver) {
                return true;
            }

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
                    gameOver = true;
                    winningLine = line;
                }
            });

            if (winningLine !== null) {
                winningLine.forEach(function(space) {
                    var row = space[0];
                    var col = space[1];

                    if (player === 1) {
                        field[row][col] = 11;
                    }
                    else {
                        field[row][col] = 22;
                    }
                });
            }
            else {
                var isDraw = field.every(function(line) {
                    return line.every(function(spaceContent) {
                        return spaceContent !== 0;
                    });
                });

                if (isDraw) {
                    gameOver = true;
                }
            }

            return gameOver;
        };

        that.getWinner = function() {
            return winner;
        }


        return that;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {TicTacToe : TicTacToe};
}
