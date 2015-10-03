var Animation = (function() {
    'use strict';
    return function(options) {
        if (!options.length) {
            throw 'length is not defined';
        }

        if (!options.type) {
            throw 'type is not defined';
        }


        var time = options.length;
        var currTime = time;

        var onEnd = function() {};

        if (options.onEnd) {
            onEnd = options.onEnd;
        }

        var type;
        if (options.type) {
            type = options.type;
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

        self.getType = function() {
            return type;
        };

        return self;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {Animation : Animation};
}

