var Renderer = (function() {
    return function(ctx) {
        var ren = {};

        var len = 50;
        var margin = 10;

        var renderSpace = function(space, content) {
            var row = space[0];
            var col = space[1];
            ctx.save();
            ctx.translate(col*(len + margin),row*(len + margin));

            ctx.fillStyle = '#bacdd3';
            /*
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
            */

            ctx.fillRect(0, 0, len, len);    
            ctx.restore();
            ctx.save();

            ctx.fillStyle = 'white';
            ctx.translate(col*(len + margin),row*(len + margin));

            if (content === 1 || content === 11) {
                ctx.fillRect(10, 10, len - 20, len - 20);    
            }
            else if (content === 2 || content === 22) {
                ctx.beginPath();
                ctx.arc(len / 2, len / 2, (len - 20)/2, 0, 2 * Math.PI, false);
                ctx.fill();
            }



            ctx.restore();


        }

        ren.render = function(scene) {
            var rows = scene.length;
            var cols = scene[0].length;

            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 180, 180);
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
