var expect = require('expect.js');

var exports = require('../src/Action.js');
var Action = exports.Action;

describe('Action', function() {
    describe('#constructor', function() {
        it('should construct action', function() {
            var action = Action({
                space: [1,2],
                token: 1,
                result: 'ongoing'
            });
        });
    });

    describe('#get', function() {
        it('should return constructed object', function() {
            var action = Action({
                space: [1,2],
                token: 1,
                result: 'ongoing'
            });

            var expected = {
                space: [1,2],
                token: 1,
                result: 'ongoing'
            };

            expect(action.isEmpty()).to.be.equal(false);
            expect(action.isPresent()).to.be.equal(true);
            expect(action.get()).to.be.eql(expected);
        });
    });

    describe('#isEmpty', function() {
        it('should return true for empty action', function() {
            var action = Action(null);

            expect(action.isEmpty()).to.be.equal(true);
            expect(action.isPresent()).to.be.equal(false);
        });

        it('should return true for empty action', function() {
            var action = Action();

            expect(action.isEmpty()).to.be.equal(true);
            expect(action.isPresent()).to.be.equal(false);
        });
    });

    describe('#Action.empty', function() {
        it('should return empty action', function() {
            var action = Action.empty();

            expect(action.isEmpty()).to.be.equal(true);
            expect(action.isPresent()).to.be.equal(false);
        });
    });

});
