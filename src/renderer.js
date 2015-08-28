var Renderer = (function() {
    return function(ctx) {
        var ren = {};

        var len = 100;
        var margin = 15;

        var q = 35/100;
        var innerOffset = Math.floor(len * q);
        var innerLen = len - innerOffset * 2;

        var renderSpace = function(space, content) {
            var row = space[0];
            var col = space[1];
            ctx.save();
            ctx.translate(col*(len + margin),row*(len + margin));

            ctx.fillStyle = '#bacdd3';

            ctx.fillRect(0, 0, len, len);    
            ctx.restore();
            ctx.save();

            ctx.fillStyle = 'white';
            ctx.translate(col*(len + margin),row*(len + margin));

            if(content === 11 || content === 22) {
                ctx.fillStyle = '#8f4d4b';
            }
            

            if (content === 1 || content === 11) {
                ctx.translate(len / 2, len / 2);
                ctx.rotate(Math.PI / 4);
                ctx.fillRect(-innerLen / 2, -innerLen / 2, innerLen , innerLen );    
            }
            else if (content === 2 || content === 22) {
                ctx.beginPath();
                ctx.arc(len / 2, len / 2, innerLen / 2, 0, 2 * Math.PI, false);
                ctx.fill();
            }

            ctx.restore();
        }

        ren.render = function(scene) {
            var rows = scene.length;
            var cols = scene[0].length;

            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 345, 345);
            ctx.restore();

            for(var row = 0; row < rows; ++row) {
                for(var col = 0; col < cols; ++col) {
                    renderSpace([row, col], scene[row][col]);
                }
            }

            
        };

        return ren;

    };
}());
