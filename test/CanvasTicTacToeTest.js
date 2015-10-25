var expect = require('expect.js');

var exports = require('../src/CanvasTicTacToe.js');
var CanvasTicTacToe = exports.CanvasTicTacToe;

describe('CanvasTicTacToe', function() {
    describe('#constructor', function() {
        it('should construct object', function() {
            var canvas = {};
            var canvasTicTacToe = CanvasTicTacToe(canvas);
        });
        it('should throw exception if canvas is not a square ', function() {
            var canvas = {};
            var canvasTicTacToe = CanvasTicTacToe(canvas);
        });
    });
});
