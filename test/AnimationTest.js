var expect = require('expect.js');

var exports = require('../src/Animation.js');
var Animation = exports.Animation;

describe('Animation', function() {
    describe('#constructor', function() {
        it('should construct animation', function() {
            var animation = Animation({
                length : 1000,
            });

            expect(animation.getPercentage()).to.be.equal(1);
        });

    });

    describe('#tick', function() {
        it('should changes progress', function() {
            var animation = Animation({
                length : 1000,
            });

            animation.tick(500);

            expect(animation.getPercentage()).to.be.equal(0.5);
        });
    });

    describe('#onEnd', function() {
        it('should fire if animation is over', function() {
            var value = 10;
            var animation = Animation({
                length : 1000,
                onEnd : function() {
                    value = 5;
                }
            });

            animation.tick(1001);

            expect(animation.getPercentage()).to.be.equal(0);
            expect(value).to.be.equal(5);
        });
    });

    describe('#isOver', function() {
        it('should be true if animation is over', function() {
            var animation = Animation({
                length : 1000,
            });

            animation.tick(1001);

            expect(animation.isOver()).to.be.equal(true);
            expect(animation.inProgress()).to.be.equal(false);
        });
    });
});
