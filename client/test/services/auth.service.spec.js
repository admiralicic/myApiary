describe('service: authentication', function () {
    var authentication;
    var tokenService;
    var $httpBackend;
    var $location;
    var user = { email: 'admir.alicic@gmail.com', password: 'test', firstName: 'Admir', lastName: 'Alicic' };
    //token created on 2016-06-21
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzQxODEwMGM4YmI0MDQyMDkwZmQ5OTIiLCJlbWFpbCI6ImFkbWlyLmFsaWNpY0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJBZG1pciIsImxhc3ROYW1lIjoiQWxpY2ljIiwiZXhwIjoxNDY3MDk5NTU0LCJpYXQiOjE0NjY0OTQ3NTR9.r1qYzqw5lUY11Cz7OMOhKvJKce-_obA8dS69pHTyL5g';

    beforeEach(function () {
        module('apiaryApp');
        inject(function (_$httpBackend_, _authentication_, _tokenService_, _$location_) {
            $httpBackend = _$httpBackend_;
            authentication = _authentication_;
            tokenService = _tokenService_;
            $location = _$location_;    
        });
    });

    describe('login', function () {

         it('should call save token once on success', function () {
            var stub = sinon.stub(tokenService, 'saveToken');
            $httpBackend.when('POST', '/api/login', user)
                .respond(200, { token: token }  );
            authentication.login(user);
            $httpBackend.flush();
            sinon.assert.calledWith(stub, token);
            stub.restore();
        });

         it('should not call save token on failure', function () {
             sinon.spy(tokenService, 'saveToken');
             $httpBackend.when('POST', '/api/login', user)
                 .respond(400);
             authentication.login(user);
             $httpBackend.flush();
             expect(tokenService.saveToken.called).to.be.false;
             tokenService.saveToken.restore();
         });
    });

    describe('register', function () {

         it('should call save token once on success', function () {
            var stub = sinon.stub(tokenService, 'saveToken');
            $httpBackend.when('POST', '/api/register', user)
                .respond(200, { token: token }  );
            authentication.register(user);
            $httpBackend.flush();
            sinon.assert.calledWith(stub, token);
            stub.restore();
        });

         it('should not call save token on failure', function () {
             sinon.spy(tokenService, 'saveToken');
             $httpBackend.when('POST', '/api/register', user)
                 .respond(400);
             authentication.register(user);
             $httpBackend.flush();
             expect(tokenService.saveToken.called).to.be.false;
             tokenService.saveToken.restore();
         });
    });

    describe('isLoggedIn', function () {
        var stub;

        beforeEach(function () {
            stub = sinon.stub(tokenService, 'getToken');
        });

        afterEach(function () {
            stub.restore();
        });

        it('should return true if valid token exists', function () {
            var now = new Date('2016-06-21');
            var clock = sinon.useFakeTimers(now.getTime());
            stub.returns(token);
            expect(authentication.isLoggedIn()).to.equal(true);
            clock.restore();
        });

        it('should return true if token <= 7 days old', function () {
            var clock = sinon.useFakeTimers(new Date('2016-06-28').getTime());
            stub.returns(token);
            expect(authentication.isLoggedIn()).to.equal(true);
            clock = sinon.useFakeTimers(new Date('2016-06-29').getTime());
            expect(authentication.isLoggedIn()).to.equal(false);
            clock.restore();
        });

        it('should return false if token > 7 days old', function () {
            var now = new Date('2016-06-29');
            var clock = sinon.useFakeTimers(now.getTime());
            stub.returns(token);
            expect(authentication.isLoggedIn()).to.equal(false);
            clock.restore();
        });

        it('should return false if token not found', function () {
            stub.returns(null);
            expect(authentication.isLoggedIn()).to.equal(false);
        });

        it('should return false if token in wrong format', function () {
            stub.returns('some invalid token text');
            expect(authentication.isLoggedIn()).to.equal(false);
        });
    });

    describe('currentUser', function () {
        var stub;

        beforeEach(function () {
            stub = sinon.stub(tokenService, 'getToken');
            stubIsLoggedIn = sinon.stub(authentication, 'isLoggedIn');
        });

        afterEach(function () {
            stub.restore();
            stubIsLoggedIn.restore();
        });

        it('should return email, first name and last name if logged in', function () {
            stub.returns(token);
            expect(authentication.currentUser().email).to.equal('admir.alicic@gmail.com');
            expect(authentication.currentUser().firstName).to.equal('Admir');
            expect(authentication.currentUser().lastName).to.equal('Alicic');
        });
        it('should return null if not logged in', function () {
            stub.returns(null);
            stubIsLoggedIn.returns(false);
            
            expect(authentication.currentUser()).to.equal(null);
        });
    });

    describe('logout', function () {
        var stub;
        beforeEach(function () {
            stub = sinon.stub(tokenService, 'clearToken');//.returns(function () { });
        });

        afterEach(function () {
            stub.restore();
        });

        it('should navigate to home page after logout', function () {
            authentication.logout();
            expect($location.url()).to.equal('/home')
        });

        it('should call clearToken once', function () {
            authentication.logout();
            expect(stub.calledOnce).to.equal(true);
        });
    });


});