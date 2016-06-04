(function () {
    'use strict';

    angular.module('apiaryApp').component('apiaryRoot', {
        templateUrl: 'components/root/apiary-root.component.html',
        $routeConfig: [
            { path: '/home', component: 'apiaryHome', name: 'Home' },
            { path: '/hives', component: 'apiaryHives', name: 'Hives' },
            { path: '/hives/:hiveId/...', component: 'hiveDetail', name: 'HiveDetail' },
            { path: '/register', component: 'registration', name: 'Register'},
            { path: '/login', component: 'login', name: 'Login'},
            { path: '/**', redirectTo: ['Home'] }
        ]
    });
})();