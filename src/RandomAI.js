var RandomAI = (function() {
    var shuffle = function(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    return function() {
        that = {};

        that.move = function(game) {

            var field = game.getField();

            var emptySpaces = [];

            field.forEach(function(line, row) {
                line.forEach(function(spaceContent, col) {
                    if (spaceContent === 0) {
                        emptySpaces.push([row, col]);
                    }
                });
            });

            shuffle(emptySpaces);

            return game.put(emptySpaces.pop());
        };

        return that;
    };
}());

if (typeof module !== 'undefined') {
    module.exports = {RandomAI : RandomAI};
}
