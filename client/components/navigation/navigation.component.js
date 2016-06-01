(function () {
    'use strict';

    angular.module('apiaryApp').component('navigation', {
        templateUrl: 'components/navigation/navigation.component.html',
        // require: {
        //     parent: '^apiaryHives'
        // },
        controllerAs: 'vm',
        controller: NavigationController
    });

    NavigationController.$inject = ['authentication', '$location']
    function NavigationController(authentication, $location) {
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

            authentication.login(vm.currentUser).then(function () {
                vm.isLoggedIn = authentication.isLoggedIn();
            });
        };

        vm.logout = function () {
            authentication.logout();
            vm.isLoggedIn = authentication.isLoggedIn();
        };

    };
})();