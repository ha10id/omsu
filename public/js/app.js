// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.tinymce', 'myApp.filters', 'myApp.services', 'myApp.directives']).
run(function($rootScope, modalService) {
    console.log("app run");
    // показываем меню
    $rootScope.showMenu = function () {
      // $log.info('show Dialog');
      var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'menu.html',
        size: 'lg'
      };
      var modalOptions = {
        closeButtonText: 'Отмена',
        actionButtonText: 'Отправить',
        headerText: 'Комментарий'
      };
      modalService.showModal(modalDefaults, modalOptions).then(function (result) {
        console.info(result);
      });

    };
  $rootScope.isAuthorized = true;
  $rootScope.isAdmin = true;

  // var session = AuthService.getSession();
    // console.log(session);
    // if(AuthService.isAuthorized()) {
    //   console.log("authorized");
    //   $rootScope.isAuthorized = true;
    // } else {
    //   console.log("unauthorized");
    //   $rootScope.isAuthorized = false;
    // }
}).
// run(function($rootScope) {
//     console.log("app run");
//     // var session = AuthService.getSession();
//     // console.log(session);
//     // if(AuthService.isAuthorized()) {
//     //   console.log("authorized");
//       $rootScope.isAuthorized = true;
//       $rootScope.isAdmin = true;
//     // } else {
//     //   console.log("unauthorized");
//     //   $rootScope.isAuthorized = false;
//     // }
// }).
config(["$provide", function($provide){
  // Use the `decorator` solution to substitute or attach behaviors to
  // original service instance; @see angular-mocks for more examples....
  $provide.decorator( '$log', [ "$delegate", function( $delegate )
  {
      // Save the original $log.debug()
      var debugFn = $delegate.debug;

      $delegate.debug = function( )
      {
        var args    = [].slice.call(arguments),
            now     = new Date();

        // Prepend timestamp
        args[0] = supplant("{0} - {1}", [ now, args[0] ]);

        // Call the original with the output prepended with formatted timestamp
        debugFn.apply(null, args)
      };

      return $delegate;
  }])
}]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    redirectTo: '/news'
  }).
  when('/news', {
    templateUrl: 'partials/indexNews',
    controller: IndexNewsCtrl
  }).
  when('/addNews', {
    templateUrl: 'partials/addPost',
    controller: AddNewsCtrl
  }).
  when('/news/:id', {
    templateUrl: 'partials/readPost',
    controller: ReadPostCtrl
  }).
  when('/adminPanel', {
    templateUrl: 'partials/adminPanel',
    controller: AdminPanelCtrl
  }).
  when('/newsEdit/:id', {
    templateUrl: 'partials/editPost',
    controller: EditPostCtrl
  }).
  // when('/deleteNews/:id', {
  //   templateUrl: 'partials/deletePost',
  //   controller: DeletePostCtrl
  // }).
  when('/galeries', {
    templateUrl: 'partials/indexGaleries',
    controller: IndexGaleriesCtrl
  }).
  when('/addGaleries', {
    templateUrl: 'partials/addGaleries',
    controller: AddGaleriesCtrl
  }).
  // when('/news', {
  //   templateUrl: 'partials/indexTips',
  //   controller: IndexNewsCtrl
  // }).
  // when('/news', {
  //   templateUrl: 'partials/indexLegislation',
  //   controller: IndexNewsCtrl
  // }).
  // when('/news', {
  //   templateUrl: 'partials/indexUseful',
  //   controller: IndexNewsCtrl
  // }).
  // when('/portaldev', {
  //   templateUrl: 'partials/indexPortalDev',
  //   controller: IndexNewsCtrl
  // }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);