// describe('getGreeting', function () {
//     var greeter;
//     beforeEach(function () {
//         module('apiaryApp');
//         inject(function (_greeter_) {
//             greeter = _greeter_;
//         });
//     });

//     it('says Helo to me', function () {
//         expect(greeter.getGreeting('Dave')).toEqual('Hello Dave');
//     });
// });


ngDescribe({
  name: 'service tests',
  modules: 'apiaryApp',
  inject: 'greeter',
  tests: function (deps) {
    it('is a function', function () {
      //la(typeof deps.addFoo === 'function');
        expect(typeof deps.greeter).toBe('function');
    });
    it('appends value of foo to any string', function () {
      var result = deps.greeter('x');
      //la(result === 'xbar');
      expect(result).toBe('xbar');
    });
  }
});

