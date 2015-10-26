if (typeof module !== 'undefined') {
    var util = require('../src/util.js');
    //var Renderer = require('../src/renderer.js');
    var Renderer = function() {
        return {
            tick: function() {
            },
            render: function() {
            }
        };
    };
    var TicTacToe = require('../src/TicTacToe.js').TicTacToe;
    var RandomAI = require('../src/RandomAI.js').RandomAI;
    var document = {
        querySelector: function() {
        }
    };
    var window = {
        requestAnimationFrame: function() {
        }    };

}

var CanvasTicTacToe = (function(document, window) {
    var screenToWorld = util.getScreenToWorld(100, 15)
    'use strict';
    return function(canvas) {
        var renderer;
        var game;
        var actions;
        //var ctx = canvas;

        if(canvas.width !== canvas.height) {
            throw {message: 'canvas is not square'};
        }

        var self = {};

        //var canvas = document.querySelector('canvas.viewport');
        var ctx = canvas.getContext('2d');
        renderer = Renderer(ctx);
        actions = [];
        game = TicTacToe();
        var ai = RandomAI();
        var aiTurn;

        var click = function(e) {
            var coord = {
                x : e.pageX - canvas.offsetLeft,
                y : e.pageY - canvas.offsetTop
            };

            var space = screenToWorld(coord.x, coord.y);

            if (game.isOver()) {
                game = TicTacToe();
                renderer = Renderer(ctx);
                actions = [];
                return;
            }

            if (space === null) {
                return;
            }

            var row = space[0];
            var col = space[1];

            if (game.getField()[row][col] !== 0) {
                return;
            }

            (function(game, space) {
                var action = game.put(space);
                actions = actions.concat(action);
            }(game, [row, col]));

            if (game.isOver()) {
                return;
            }

            canvas.removeEventListener('mouseup', click);

            setTimeout(aiTurn, 0);
        };

        aiTurn = function() {
            var action = ai.move(game);
            actions = actions.concat(action);
            canvas.addEventListener('mouseup', click);
        };


        canvas.addEventListener('mouseup', click);

        var lastTime = new Date().getTime();
        var lastActionMade = lastTime;

        var loop = function() {
            var currTime = new Date().getTime();
            var delta = currTime - lastTime;

            renderer.tick(delta);

            var actionDelta = currTime - lastActionMade;

            if (actions.length !== 0 && actionDelta > 500) {
                var action = actions.shift();

                if (action.isPresent()) {
                    renderer.adoptAction(action.get());

                    lastActionMade = currTime;
                }
            }

            renderer.render();
            lastTime = currTime;

            window.requestAnimationFrame(loop);
        };

        loop();

        return self;
    };
}(document, window, Renderer));

if (typeof module !== 'undefined') {
    module.exports = {CanvasTicTacToe : CanvasTicTacToe};
}

