var expect = require('expect.js');

var exports = require('../src/util.js');
var getScreenToWorld = exports.getScreenToWorld;

describe('util', function() {
    describe('#getScreenToWorld', function() {
        it('should throw if arguments are zero or less', function() {
            expect(getScreenToWorld).withArgs(0, -1).to.throwException();
        });

    });
    describe('#screenToWorld', function() {
        var screenToWorld = getScreenToWorld(50, 10);
        it('should define tile when clicked on', function() {
            var expectedSpace = [1, 2];

            var space = screenToWorld(147, 86);

            expect(space).to.be.eql(expectedSpace);
        });

        it('should return null if user clicked between tiles', function() {
            var expectedSpace = [1, 2];

            var space = screenToWorld(147, 54);

            expect(space).to.be.eql(null);
        });

        it('should throw if coords are negative', function() {
            expect(screenToWorld).withArgs(-147, -54).to.throwException();
        });
    });
});
