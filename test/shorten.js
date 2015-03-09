(function() {
    'use strict';

    var googl = require('../lib/googl.js'),
        chai = require('chai'),
        chaiAsPromised = require('chai-as-promised'),
        expect = chai.expect;

    chai.use(chaiAsPromised);

    describe('#shorten()', function() {
        beforeEach(function() {
            googl.setKey('test');
        });

        xit('should fail with no input', function(done) {
            var errMsg = 'Invalid URL specified';

            expect(googl.expand())
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should fail with an empty string as input', function(done) {
            var errMsg = 'Invalid URL specified';

            expect(googl.expand(''))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should fail as invalid value with bad url', function(done) {
            var url = 'http:/www.google.com', // one slash
                errMsg = '400 - Invalid Value';

            expect(googl.expand(url))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should shorten a url', function(done) {
            var url = 'http://www.spotify.com',
                urlShortened = 'http://goo.gl/cJFAL';

            expect(googl.shorten(url))
                .to.eventually.equal(urlShortened)
                .and.notify(done);
        });

        xit('should shorten a url with a valid key');

        xit('should not shorten a url with an invalid key', function(done) {
            var url = 'http://goo.gl/cJFAL',
                errMsg = '400 - Bad Request';

            googl.setKey('nope');

            expect(googl.shorten(url))
                .to.be.rejectedWith(errMsg)
                .and.notify(done);
        });

        xit('should shorten a url without the protocol', function(done) {
            var url = 'www.spotify.com',
                urlShortened = 'http://goo.gl/cJFAL';

            expect(googl.shorten(url))
                .to.eventually.equal(urlShortened)
                .and.notify(done);
        });

        xit('should shorten a url without a protocol or sub-domain', function(done) {
            var url = 'spotify.com',
                urlShortened = 'http://goo.gl/ZZ0D3';

            expect(googl.shorten(url))
                .to.eventually.equal(urlShortened)
                .and.notify(done);
        });
    });
}());
