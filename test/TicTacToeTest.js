var expect = require('expect.js');

var TicTacToe = require('../src/TicTacToe.js').TicTacToe;

describe('TicTacToe', function() {
    var game = null;
    beforeEach(function() {
        game = TicTacToe();
    });

    var drawGame = function(game) {

        game.put([1, 1]);
        game.put([0, 1]);
        game.put([0, 2]);
        game.put([0, 0]);
        game.put([1, 0]);
        game.put([2, 0]);
        game.put([2, 1]);
        game.put([1, 2]);
        game.put([2, 2]);

    };

    var winCross = function(game) {
        game.put([0,0]);
        game.put([0,1]);
        game.put([1,1]);
        game.put([0,2]);
        game.put([2,2]);
    };

    describe('#constructor', function() {
        it('should create object', function() {
            expect(game).to.be.ok();
        });

        it('should build empty game field', function() {

            var expectedField = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];

            expect(game.getField()).to.be.eql(expectedField);
        });

        it('should set crosses go first', function() {
            expect(game.getPlayer()).to.be.equal(1);
        });
    });

    describe('#put', function() {
        it('should change field when called', function() {
            drawGame(game);

            var expectedField = [
                [2, 2, 1],
                [1, 1, 2],
                [2, 1, 1]
            ];

            expect(game.getField()).to.be.eql(expectedField);
        });

        it('should change player after called', function() {
            game.put([1,1]);
            var expectedPlayer = 2;

            expect(game.getPlayer()).to.be.equal(expectedPlayer);
        });

        it('should do nothing if space is already filled', function() {
            game.put([1,1]);
            game.put([1,1]);

            var expectedField = [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ];

            var expectedPlayer = 2;

            expect(game.getPlayer()).to.be.equal(expectedPlayer);
            expect(game.getField()).to.be.eql(expectedField);
            expect(game.isOver()).to.be.equal(false);
        });


        it('should put 11 or 22 through winning line', function() {
            winCross(game);

            var expectedField = [
                [11, 2, 2],
                [0, 11, 0],
                [0, 0, 11]
            ];

            expect(game.getField()).to.be.eql(expectedField);
        });


        it('should not do anyting if game is over', function() {
            winCross(game);

            game.put([2,0]);

            var expectedField = [
                [11, 2, 2],
                [0, 11, 0],
                [0, 0, 11]
            ];

            expect(game.getField()).to.be.eql(expectedField);
            expect(game.getPlayer()).to.be.eql(1);
        });

    });

    describe('#gameOver', function() {
        it('should detect that game is a draw', function() {
            drawGame(game);

            expect(game.isOver()).to.be.eql(true);
        });

        it('should notice if player won', function() {
            winCross(game);

            expect(game.isOver()).to.be.equal(true);
        });

        it('should not think game is over in this particular situation', function() {
            //winCross(game);
            game.put([2, 0]);
            game.put([0, 0]);
            game.put([1, 0]);

            game.put([2, 1]);
            game.put([1, 1]);


            game.put([0, 2]);
            game.put([2, 2]);
            game.put([1, 2]);


            expect(game.isOver()).to.be.equal(false);
        });
    });

    describe('#getWinner', function() {
        it('should define which player won', function() {
            winCross(game);

            expect(game.getWinner()).to.be.eql(1);
        });
    });

    describe('#getMoves', function() {
        it('should return all moves', function() {
            game.put([2, 0]);
            game.put([0, 0]);
            game.put([1, 0]);

            game.put([2, 1]);
            game.put([1, 1]);


            game.put([0, 2]);
            game.put([2, 2]);
            game.put([1, 2]);

            var expectedMoves = [
                [2, 0],
                [0, 0],
                [1, 0],

                [2, 1],
                [1, 1],


                [0, 2],
                [2, 2],
                [1, 2],
            ];

            expect(game.getMoves()).to.be.eql(expectedMoves);
        });
    });
});
