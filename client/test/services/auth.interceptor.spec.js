describe('service: authInterceptor', function () {
    var token = 'sometoken';

    var $httpBackend;
    var authInterceptor;
    var hiveService;
    var tokenService;
    var $location;

    beforeEach(function () {
        module('apiaryApp', function ($httpProvider) {
            httpProviderIt = $httpProvider;
        });

        inject(function (_authInterceptor_, _$httpBackend_, _hiveService_, _tokenService_, _$location_) {
            authInterceptor = _authInterceptor_;
            $httpBackend = _$httpBackend_;
            hiveService = _hiveService_;
            tokenService = _tokenService_;
            $location = _$location_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(httpProviderIt.interceptors).to.contain('authInterceptor');
    });

    it('should put token in request header if token is set', function () {
        var stub = sinon.stub(tokenService, 'getToken').returns(token);
        $httpBackend.whenGET('/api/hives', function (headers) {
            expect(headers.Authorization).to.equal('Bearer ' + token);
            return headers;
        }).respond(200, {});
        hiveService.list();
        $httpBackend.flush();
        stub.restore();
    });

    it('should not put token in request header if token is not set', function () {
        var stub = sinon.stub(tokenService, 'getToken').returns();
        $httpBackend.whenGET('/api/hives', function (headers) {
            expect(headers.Authorization).to.be.an('undefined');
            return headers;
        }).respond(200, {});
        hiveService.list();
        $httpBackend.flush();
        stub.restore();
    });

    it('should redirect to home page if no valid token', function () {
        $httpBackend.whenGET('/api/hives').respond(401);
        hiveService.list();
        $httpBackend.flush();
        expect($location.url()).to.equal('/login');
    });


});