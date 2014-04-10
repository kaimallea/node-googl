(function() {
    'use strict';

    var googl = require('../lib/googl.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

    chai.use(chaiAsPromised);

    describe('#setKey()', function() {
        beforeEach(function() {
            googl.setKey('');
        });

        it('should return the key that was set', function() {
            var key = 'abcDEF123456';

            return expect(googl.setKey(key)).to.equal(key);
        });

        it('should return the key that was set', function() {
            var key = '';

            return expect(googl.setKey(key)).to.equal(key);
        });
    });
}());
