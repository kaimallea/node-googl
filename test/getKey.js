(function() {
    'use strict';

    var googl = require('../lib/googl.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

    chai.use(chaiAsPromised);

    describe('#getKey()', function() {
        it('should return an empty key if nothing is set', function() {
            return expect(googl.getKey()).to.equal('');
        });

        it('should return the same key that was set', function() {
            var key = 'abcDEF123456';
            googl.setKey(key);

            return expect(googl.getKey()).to.equal(key);
        });
    });
}());
