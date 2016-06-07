(function () {
    'use strict';

    angular.module('apiaryApp', ['ngComponentRouter', 'ngAnimate', 'ui.bootstrap', 'app.core'])
        .value('$routerRootComponent', 'apiaryRoot')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }]);
})();