(function() {
    'use strict';

    var googl = require('../lib/googl.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

    chai.use(chaiAsPromised);

    describe('#_googleRequest()', function() {
        beforeEach(function() {
            googl.setKey('');
        });

        xit('should fail with no input', function(done) {
            var errMsg = 'Invalid URL specified';

            expect(googl._googleRequest())
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should fail with no url', function(done) {
            var errMsg = 'Invalid URL specified';

            expect(googl._googleRequest('shorten'))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should shorten a url', function(done) {
            var url = 'http://www.spotify.com',
                urlShortened = 'http://goo.gl/cJFAL';

            expect(googl._googleRequest('shorten', url))
                .to.eventually.be.fulfilled
                .and.notify(done);
        });

        xit('should expand a url', function(done) {
            var url = 'http://www.spotify.com',
                urlShortened = 'http://goo.gl/cJFAL';

            expect(googl._googleRequest('expand', urlShortened))
                .to.eventually.be.fulfilled
                .and.notify(done);
        });

        xit('should fail as invalid operation when shorten or expand not used', function(done) {
            var errMsg = 'Invalid operation',
                url = 'https://www.spotify.com/';

            expect(googl._googleRequest('asdf', url))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });
    });
}());
