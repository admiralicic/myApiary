(function () {
    'use strict';

    angular.module('apiaryApp')
        .service('greeter', function () {
            return function (str) {
                return str + 'bar';
            };
        });

})();