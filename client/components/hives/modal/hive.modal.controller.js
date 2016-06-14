(function () {
    'use strict';

    angular.module('apiaryApp').controller('NewHiveController', NewHiveController);

    NewHiveController.$inject = ['$mdDialog', 'locals'];    
    function NewHiveController($mdDialog, locals) {
        /*jshint validthis: true */
        var vm = this;
        
        vm.hive = {};
        vm.years = ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
        vm.locations = ['Dobosnica', 'Grabovica', 'Tuzla'];
        
        if (locals._id) {
            vm.hive = locals;
        }
        
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.save = function () {
            $mdDialog.hide(vm.hive);
        };
    }
    
})();