var Action = (function() {
    var Action = function(inValue) {
        var self = {};

        var clone = function(value) {
            var props = [
                'result',
                'space',
                'victor',
                'token',
                'victoryLine'
            ];
        
            var result =  {};

            var inProps = Object.keys(value);

            result = inProps.reduce(function(prev, curr) {
                if (props.indexOf(curr) !== -1) {
                    prev[curr] = value[curr];
                }
                return prev;
            }, {});


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

