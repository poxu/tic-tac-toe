var Animation = (function() {
    'use strict';
    return function(options) {
        if (!options.length) {
            throw 'length is not defined';
        }

        var time = options.length;
        var currTime = time;

        var onEnd = function() {};

        if (options.onEnd) {
            onEnd = options.onEnd;
        }

        var self = {};

        self.getPercentage = function() {
            return currTime/time;
        };

        self.tick = function(time) {
            currTime -= time;
            if (currTime <= 0) {
                currTime = 0;
                onEnd();
            }
        };

        self.isOver = function() {
            return currTime <= 0;
        };

        self.inProgress = function() {
            return !self.isOver();
        };

        return self;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {Animation : Animation};
}

