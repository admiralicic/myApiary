(function () {
    'use strict';

    angular.module('apiaryApp', ['ngComponentRouter', 'ngAnimate', 'ui.bootstrap'])
        .value('$routerRootComponent', 'apiaryRoot')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });
})();