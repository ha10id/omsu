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
    $rootScope.tinymceOptions = {
      // General options
      selector:'textarea',
      mode : "exact",
      elements : "wysiwygEditor",
      themes : "modern",
      language: 'ru',
      height: 400,
      plugins : "image,pagebreak,layer,table,save,advlist,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,fullscreen,noneditable,visualchars,nonbreaking,template",
      extended_valid_elements : 'script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],div[*],p[*],object[width|height|classid|codebase|embed|param],param[name|value],embed[param|src|type|width|height|flashvars|wmode]',
      // media_strict: false,
      theme_advanced_toolbar_location : "top",
      theme_advanced_toolbar_align : "left",
      theme_advanced_statusbar_location : "bottom",
      theme_advanced_resizing : true,
      relative_urls : true,
      // convert_urls : false,
      file_browser_callback: function(field_name, url, type, win) {
          if(type=='image') $('#my_form input').click();
      }
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
  // новости
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
  when('/newsEdit/:id', {
    templateUrl: 'partials/editPost',
    controller: EditPostCtrl
  }).
  // галерея
  when('/galleries', {
    templateUrl: 'partials/indexGalleries',
    controller: IndexGalleriesCtrl
  }).
  when('/galleries/:id', {
    templateUrl: 'partials/readGalleries',
    controller: ReadGalleriesCtrl
  }).
  when('/addGalleries', {
    templateUrl: 'partials/addGalleries',
    controller: AddGalleriesCtrl
  }).
  when('/editGalleries/:id', {
    templateUrl: 'partials/editGalleries',
    controller: EditGalleriesCtrl
  }).
  // полезные советы
  when('/usefuls', {
    templateUrl: 'partials/indexUsefuls',
    controller: IndexUsefulsCtrl
  }).
  when('/usefuls/:id', {
    templateUrl: 'partials/readUsefuls',
    controller: ReadUsefulsCtrl
  }).
  when('/addUsefuls', {
    templateUrl: 'partials/addUsefuls',
    controller: AddUsefulsCtrl
  }).
  when('/editUsefuls/:id', {
    templateUrl: 'partials/editUsefuls',
    controller: EditUsefulsCtrl
  }).
  // изменения в законодательстве
  when('/legislations', {
    templateUrl: 'partials/indexLegislations',
    controller: IndexLegislationsCtrl
  }).
  when('/legislations/:id', {
    templateUrl: 'partials/readLegislations',
    controller: ReadLegislationsCtrl
  }).
  when('/addLegislations', {
    templateUrl: 'partials/addLegislations',
    controller: AddLegislationsCtrl
  }).
  when('/editLegislations/:id', {
    templateUrl: 'partials/editLegislations',
    controller: EditLegislationsCtrl
  }).
  // полезно знать
  // when('/gootToKnows', {
  //   templateUrl: 'partials/indexGootToKnows',
  //   controller: IndexGootToKnowsCtrl
  // }).
  // when('/gootToKnows/:id', {
  //   templateUrl: 'partials/readGootToKnows',
  //   controller: ReadGootToKnowsCtrl
  // }).
  // when('/addGootToKnows', {
  //   templateUrl: 'partials/addGootToKnows',
  //   controller: AddGootToKnowsCtrl
  // }).
  // when('/editGootToKnows/:id', {
  //   templateUrl: 'partials/editGootToKnows',
  //   controller: EditGootToKnowsCtrl
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