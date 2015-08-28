var Renderer = (function() {
    return function(ctx) {
        var ren = {};

        var len = 50;
        var margin = 10;

        var renderSpace = function(space, content) {
            var row = space[0];
            var col = space[1];
            ctx.save();

            if (content === 0) {
                ctx.fillStyle = 'black';
            }
            else if (content === 1) {
                ctx.fillStyle = 'green';
            }
            else if (content === 2) {
                ctx.fillStyle = 'red';
            }
            else if (content === 22) {
                ctx.fillStyle = 'pink';
            }
            else if (content === 11) {
                ctx.fillStyle = 'lightgreen';
            }

            ctx.fillRect(col*(len + margin), row*(len + margin), len, len);    
            ctx.restore();
        }

        ren.render = function(scene) {
            var rows = scene.length;
            var cols = scene[0].length;

            for(var row = 0; row < rows; ++row) {
                for(var col = 0; col < cols; ++col) {
                    renderSpace([row, col], scene[row][col]);
                }
            }

            
        };

        return ren;

    };
}());
