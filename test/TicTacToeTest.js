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
        return game.put([2,2]);
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

        it('should return action made', function() {
            var actions = game.put([1,0]);

            var expected = {
                space: [1,0],
                token: 1,
                result: 'ongoing'
            };


            expect(actions.length).to.be.equal(1);

            var action = actions.pop();

            expect(expected).to.be.eql(action.get());
            expect(action.isEmpty()).to.be.equal(false);
        });

        it('should return empty action after trying to put token to occupied field', function() {
            
            game.put([1,0]);

            var actions = game.put([1,0]);

            expect(actions.length).to.be.equal(1);
            var action = actions.pop();

            expect(action.isEmpty()).to.be.equal(true);
        });

        it('should return empty action after game is over', function() {
            winCross(game);

            var actions = game.put([1,0]);

            expect(actions.length).to.be.equal(1);
            var action = actions.pop();

            expect(action.isEmpty()).to.be.equal(true);
        });

        it('should return two actions for last move and inform about the victor and victory line', function() {
            var actions = winCross(game);

            expect(actions.length).to.be.equal(2);

            var moveAction = actions.shift();
            var victoryAction = actions.shift();

            expect(moveAction.isEmpty()).to.be.equal(false);

            expect(victoryAction.isEmpty()).to.be.equal(false);
            expect(victoryAction.get().result).to.be.equal('victory');
            expect(victoryAction.get().victor).to.be.equal(1);

            expect(victoryAction.get().victoryLine).to.be.ok();
            expect(victoryAction.get().victoryLine).to.be.eql([[0, 0], [1, 1], [2, 2]]);
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
