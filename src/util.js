var util = (function() {
    var util = {};

    util.getScreenToWorld = function(tileSize, margin) {
        if (tileSize <= 0 || margin <= 0) {
            throw {
                message : 'negative tileSize or margin are not allowed'
            };
        };

        return function(x, y) {
            if (x < 0 || y < 0) {
                throw {
                    message : 'negative coords are not allowed'
                };
            };


            var row = Math.floor(y/(tileSize + margin));
            var col = Math.floor(x/(tileSize + margin));

            var tileY = y - row*(tileSize + margin);
            var tileX = x - col*(tileSize + margin);

            if (tileY >= tileSize || tileX >= tileSize) {
                return null;
            }

            return [row, col];
        };
    };

    return util;
}());

if (typeof module !== 'undefined') {
    module.exports = util;
}
