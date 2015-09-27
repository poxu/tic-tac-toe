var Renderer = (function() {
    return function(ctx) {
        var ren = {};

        var len = 100;
        var margin = 15;

        var q = 35/100;
        var innerOffset = Math.floor(len * q);
        var innerLen = len - innerOffset * 2;
        var renderRoundedRect = function(size, radius) {
            var width = len;
            var height = len;

            ctx.beginPath();
            ctx.moveTo(radius, 0);
            ctx.lineTo(width - radius, 0);
            ctx.quadraticCurveTo(width, 0, width, radius);
            ctx.lineTo(width, height - radius);
            ctx.quadraticCurveTo(width, height, width - radius, height);
            ctx.lineTo(radius, height);
            ctx.quadraticCurveTo(0, height, 0,height - radius);
            ctx.lineTo(0, radius);
            ctx.quadraticCurveTo(0, 0, radius, 0);
            ctx.closePath();
            ctx.fill();
        };

        var renderSpace = function(space, content) {
            var row = space[0];
            var col = space[1];
            ctx.save();
            ctx.translate(col*(len + margin),row*(len + margin));

            ctx.fillStyle = '#bacdd3';

            var width = len;
            var height = len;
            var radius = 5;

            var animation = ren.actions[row][col];
            var time = 1;

            if (animation !== null) {
                time = 1 - animation.getPercentage();
            }


            var inLen = innerLen*time;

            renderRoundedRect(len, radius);


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
                ctx.fillRect(-inLen / 2, -inLen / 2, inLen , inLen );    
            }
            else if (content === 2 || content === 22) {
                ctx.beginPath();
                ctx.arc(len / 2, len / 2, inLen / 2, 0, 2 * Math.PI, false);
                ctx.fill();
            }

            ctx.restore();
        }

        ren.actions = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        ren.render = function(game) {
            var scene = game;
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
