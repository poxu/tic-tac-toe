var Action = (function() {
    var Action = function(inValue) {
        var self = {};

        var clone = function(value) {
            var result =  {};

            if (value.result) {
                result.result = value.result;
            }

            if (value.space) {
                result.space = value.space;
            }

            if (value.token) {
                result.token = value.token;
            }

            if (value.victor) {
                result.victor = value.victor;
            }

            if (value.victoryLine) {
                result.victoryLine = value.victoryLine;
            }

            return result;
        };

        var value = null;
        if (inValue != null) {
            value = clone(inValue);
        }


        self.get = function() {
            return clone(value);
        };

        self.isEmpty = function() {
            return value == null;
        };

        self.isPresent = function() {
            return !self.isEmpty();
        };


        return self;
    };

    Action.empty = function() {
        return Action();
    };

    return Action;
}());

if (typeof module !== 'undefined') {
    module.exports = {Action : Action};
}

