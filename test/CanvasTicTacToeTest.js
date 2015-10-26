var expect = require('expect.js');

var exports = require('../src/CanvasTicTacToe.js');
var CanvasTicTacToe = exports.CanvasTicTacToe;

describe('CanvasTicTacToe', function() {
    describe('#constructor', function() {
        it('should construct object', function() {
            var canvas = {
                getContext: function(){
                    return {
                        save: function() {
                        }
                    };
                } ,
                addEventListener: function() {
                }

            };
            var canvasTicTacToe = CanvasTicTacToe(canvas);
        });
        it('should throw exception if canvas is not a square ', function() {
            var canvas = {
                width: 200,
                height: 300,
                getContext: function(){},
                addEventListener: function() {
                }

            };
            expect(function() {CanvasTicTacToe(canvas);}).to.throwError();
        });
    });
});
