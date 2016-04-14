'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.table',
    'myApp.version',
    'ngAnimate'
]).config(['$routeProvider', '$animateProvider', function ($routeProvider, $animateProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
    console.log($animateProvider.$$registeredAnimations);
    $animateProvider.register('.testing', function () {
        return {
            //enter, leave, move signature
            enter: function (element, done, options) {
                //code to run the animation
                console.log('enter', arguments);
                //once complete, then run done()
                var innerTimeout, timeout = setTimeout(function () {
                    console.log(element[0].className = !element[0].className.match(/ in/) ? element[0].className + ' in' : element[0].className.replace(/^(.*?)( in| out)(.*?)$/, '$1$3 in'));
                    innerTimeout = setTimeout(done, 500);
                }, 500);
                return function endFunction(wasCancelled) {
                    //code to cancel the animation
                    console.log(arguments);
                    clearTimeout(timeout);
                    clearTimeout(innerTimeout);
                }
            },
            leave: function (element, done, options) {
                //code to run the animation
                console.log('leave', arguments);
                console.log(element[0].className = element[0].className.replace(/^(.*?)( in| out)(.*?)$/, '$1$3 out'));
                //once complete, then run done()
                var timeout = setTimeout(done, 500);
                return function endFunction(wasCancelled) {
                    //code to cancel the animation
                    console.log(arguments);
                    clearTimeout(timeout);
                }
            }
        }
    });
    //console.log($animateProvider.$$registeredAnimations);
    //console.log($animateProvider.classNameFilter(/testing/));
}]);
