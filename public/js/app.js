angular.module("myApp",["ngRoute","ngSanitize","ui.bootstrap","myApp.filters","myApp.services","myApp.directives"]).config(["$provide",function($provide){$provide.decorator("$log",["$delegate",function($delegate){var debugFn=$delegate.debug;$delegate.debug=function(){var args=[].slice.call(arguments),now=new Date;args[0]=supplant("{0} - {1}",[now,args[0]]);debugFn.apply(null,args)};return $delegate}])}]).config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"partials/index",controller:IndexCtrl}).when("/readPost/:id",{templateUrl:"partials/readPost",controller:ReadPostCtrl}).otherwise({redirectTo:"/"});$locationProvider.html5Mode(true)}]);
