var CanvasTicTacToe = (function() {
    'use strict';
    return function(canvas) {
        if(canvas.widht !== canvas.height) {
            throw {message: 'canvas is not square'};
        }

        var self = {};

        return self;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {CanvasTicTacToe : CanvasTicTacToe};
}

