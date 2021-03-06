(function () {
    'use strict';

    angular.module('apiaryApp', [
        'ngComponentRouter',
        'ngAnimate',
        'ngMaterial',
        'ngMdIcons',

        'app.core'])
        
        
        .value('$routerRootComponent', 'apiaryRoot')
        .config(['$httpProvider', '$mdIconProvider', '$mdThemingProvider',
            function ($httpProvider, $mdIconProvider, $mdThemingProvider) {
            $httpProvider.interceptors.push('authInterceptor');

            $mdIconProvider
                .icon('login', 'images/login.svg', 24)
                .icon('logout', 'images/logout.svg', 24)
                .icon('menu', 'images/menu.svg', 24);
            
            $mdThemingProvider.theme('indigo');
                // .primaryPalette('blue')
                // .accentPalette('orange');
        }]);
})();