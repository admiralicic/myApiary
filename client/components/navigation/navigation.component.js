(function () {
    'use strict';

    angular.module('apiaryApp').component('navigation', {
        templateUrl: 'components/navigation/navigation.component.html',
        controllerAs: 'vm',
        controller: NavigationController
    });

    NavigationController.$inject = ['authentication']
    function NavigationController(authentication) {
        var vm = this;

        vm.currentUser = {
            email: '',
            name: '',
            password: ''
        };

        vm.$onInit = function () {
            vm.isLoggedIn = authentication.isLoggedIn();

            if (vm.isLoggedIn) {
                var currentUser = authentication.currentUser();
                vm.currentUser.email = currentUser.email;
                vm.currentUser.name = currentUser.firstName + ' ' + currentUser.lastName;
            }
        };

        vm.login = function () {
            vm.isLoggedIn = true;
            vm.currentUser.email = 'admir.alicic@gmail.com';
            vm.currentUser.password = 'test';
            vm.currentUser.name = 'Admir Alicic';

            authentication.login(vm.currentUser);
        };

        vm.logout = function () {
            authentication.logout();
            vm.isLoggedIn = authentication.isLoggedIn();
        };

    };
})();