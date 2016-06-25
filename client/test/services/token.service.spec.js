describe('service: tokenService', function(){
    var stub;

    beforeEach(function(){
        module('apiaryApp');
        inject(function(_$window_, _tokenService_){
            window = _$window_;
            tokenService = _tokenService_;
        });
    });

    afterEach(function(){
        stub.restore();
    });

    it('should save token to localStorage', function(){
        stub = sinon.stub(window.localStorage, 'setItem', function(){});
        tokenService.saveToken('token');
        expect(stub.called).to.be.true;
    });

    it('should return a token', function(){
        stub = sinon.stub(window.localStorage, 'getItem').returns('token');
        var token = tokenService.getToken();
        expect(token).to.equal('token');
    });

    it('should clear a token', function(){
        stub = sinon.stub(window.localStorage, 'removeItem', function(){});
        tokenService.clearToken();
        expect(stub.calledOnce).to.equal(true);
    });


});