describe('getGreeting', function () {
    // var greeter;
    // beforeEach(function () {
    //     module('apiaryApp');
    //     inject(function (_greeter_) {
    //         greeter = _greeter_;
    //     });
    // });

    it('First test', function () {
        //expect(typeof greeter).toBe('function');
        [1, 2, 3].indexOf(5).should.equal(-1);
    });
});


// ngDescribe({
//   name: 'service tests',
//   modules: 'apiaryApp',
//   inject: 'greeter',
//   tests: function (deps) {
//     it('is a function', function () {
//       //la(typeof deps.addFoo === 'function');
//         expect(typeof deps.greeter).toBe('function');
//     });
//     it('appends value of foo to any string', function () {
//       var result = deps.greeter('x');
//       //la(result === 'xbar');
//       expect(result).toBe('xbar');
//     });
//   }
// });

