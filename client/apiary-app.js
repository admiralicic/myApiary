(function () {
    'use strict';

    angular.module('apiaryApp', ['ngComponentRouter', 'ngAnimate', 'ui.bootstrap', 'app.core'])
        .value('$routerRootComponent', 'apiaryRoot')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });
})();