/**
 * Created by caoyouxin on 4/7/16.
 */
'use strict';

angular.module('myApp.table', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/table', {
            templateUrl: 'table/table.html',
            controller: 'TableCtrl'
        });
    }])

    .controller('TableCtrl', ['$scope', function ($scope) {

        $scope.rows = [
            {a: 'a', b: 'b'},
            {a: 'c', b: 'd'}
        ];

    }])

    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('template/common.html', '<div ng-dblclick="type = 1" ng-bind="data"></div>');
        $templateCache.put('template/ffInput.html', '<div ng-dblclick="type = 0"><input type="text" ng-model="data"/></div>');
    }])

    .directive('ffInput', ['$templateCache', '$compile', function ($templateCache, $compile) {

        function template(type) {
            return $templateCache.get('template/' + (Boolean(type) ? 'ffInput' : 'common') + '.html');
        }

        return {
            priority: 0,
            //template: template(0),
            //transclude: 'element',
            restrict: 'A',
            //templateNamespace: 'html',
            scope: {
                data: '=ffInput'
            },
            bindToController: false,
            //require: '^ffTableBody',
            link: function link(scope, element, attrs) {

                scope.type = 0;

                var $ele = angular.element(element[0]);

                $ele.html(template(scope.type));
                $compile($ele.children())(scope);

                scope.$watch('type', function (newValue, oldValue) {

                    if (!angular.equals(newValue, oldValue)) {
                        $ele.html(template(newValue));
                        $compile($ele.children())(scope);
                    }
                });
            }
        };
    }]);
