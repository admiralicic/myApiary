describe('getGreeting', function () {
    var greeter;
    beforeEach(function () {
        module('apiaryApp');
        inject(function (_greeter_) {
            greeter = _greeter_;
        });
    });

    it('First test', function () {
        expect(typeof greeter).to.equal('function');
        //expect([1, 2, 3].indexOf(1)).to.equal(0);
        //expect([1, 2, 3]).to.not.be.an.instanceOf(Array);
        //expect(1).to.not.equal(1);
    });
});


ngDescribe({
  name: 'service tests',
  modules: 'apiaryApp',
  inject: 'greeter',
  tests: function (deps) {
    it('is a function', function () {
      //la(typeof deps.addFoo === 'function');
        expect(typeof deps.greeter).to.equal('function');
    });
    it('appends value of foo to any string', function () {
      var result = deps.greeter('x');
      //la(result === 'xbar');
      expect(result).to.equal('xbar');
    });
  }
});

