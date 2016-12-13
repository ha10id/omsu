// Контроллеры
// главная страница
function IndexNewsCtrl($rootScope, $scope, $http, News, $location, $log) {
  $scope.posts = News.query();
  $log.info($scope.posts);

  // $rootScope.showMenu = function() {
  //   $log.info('click!');
  //   alert('click!');
  // };

  $scope.addNews = function(){
    $location.url('/addNews');
  };
};

function ReadPostCtrl($scope, $http, News, $routeParams) {
  News.get({id: $routeParams.id}, function(data){
    $scope.post = data;
  });
}
// добавление новости
function AddNewsCtrl($scope, $location, $routeParams, News, $timeout, $log) {
  'use strict';
  $scope.tinymceOptions = {
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
  // чистим поля формы
  $scope.form = {};
  // функция сохранения обращения
  $scope.commitDocument = function () {
    $log.info('новость: ', $scope.tinymceModel);
    $scope.form.creation_date = new Date();
    $scope.form.publication_date = new Date();
    $scope.form.created_by = "currentUser";
    $scope.form.body = $scope.tinymceModel;
    var newNews = new News($scope.form);
    console.log(newNews)
    newNews.$save().then(
      function (data) {
        $log.info("новость сохранена");
        // $log.debug(data);
        $location.url('/');
      },
      function (err) {
        // сообщаем об ошибке.
        $log.warn("++++++++++++++++++++++++++++");
        switch(err.status) {
          case 401:
          $log.info(err);
          alert('Вы не авторизованы! Зарегистрируйтесь на портале (меню "ВХОД").');
          break;
          default:
          alert(err.statusText);
        };
        $location.url('/');
      }
      );
  };
}

// страница администрирования
function AdminPanelCtrl($scope, $http, News, $log) {
  'use strict';
  var news = News.get({id: '58480ee1160164c533cbe59e'}, function(data){
    $scope.tinymceModel = data.body;
    $scope.title = data.title;
    $log.info(data);
  });
  $scope.commit = function() {
    console.log('Editor content:', $scope.tinymceModel);
    news.post.text = $scope.tinymceModel;
    News.update({id: 0}, news,
      function (data) {
        $log.info("новость сохранена");
      },
      function (err) {
        // сообщаем об ошибке.
        $log.warn("++++++++++++++++++++++++++++");
        switch(err.status) {
          case 401:
          $log.info(err);
          alert('Вы не авторизованы! Зарегистрируйтесь на портале (меню "ВХОД").');
          break;
          case 403:
          $log.info(err);
          alert('Не достаточно прав.');
          break;
          default:
          alert(err.statusText);
        };
      }
      );
  };
};

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
    success(function(data) {
      $location.path('/');
    });
  };
}

function EditPostCtrl($scope, $location, News, $routeParams, $log) {
  $scope.form = {};
  'use strict';
  var news = News.get({id: $routeParams.id}, function(data){
    $scope.tinymceModel = data.body;
    $scope.title = data.title;
    $log.info(data);
  });
  $scope.commitDocument = function() {
    console.log('Editor content:', $scope.tinymceModel);
    news.body = $scope.tinymceModel;
    news.title = $scope.title;
    News.update({id: $routeParams.id}, news,
      function (data) {
        $log.info("новость сохранена");
        $location.url('/news/');
      },
      function (err) {
        // сообщаем об ошибке.
        $log.warn("++++++++++++++++++++++++++++");
        switch(err.status) {
          case 401:
          $log.info(err);
          alert('Вы не авторизованы! Зарегистрируйтесь на портале (меню "ВХОД").');
          break;
          case 403:
          $log.info(err);
          alert('Не достаточно прав.');
          break;
          default:
          alert(err.statusText);
        };
      });
  };

  $scope.removeDocument = function () {
    $log.info('новость: ', news);
    let result = News.remove({id: $routeParams.id});
    console.log(result)
    $location.url('/news');
    // $scope.form.body = $scope.tinymceModel;
    // var newNews = new News($scope.form);
    // console.log(newNews)
    // newNews.$save().then(
    //   function (data) {
    //     $log.info("новость сохранена");
    //     $log.debug(data);
    //     $location.url('/');
    //   },
    //   function (err) {
    //     // сообщаем об ошибке.
    //     $log.warn("++++++++++++++++++++++++++++");
    //     switch(err.status) {
    //       case 401:
    //         $log.info(err);
    //         alert('Вы не авторизованы! Зарегистрируйтесь на портале (меню "ВХОД").');
    //         break;
    //       default:
    //         alert(err.statusText);
    //     };
    //     $location.url('/');
    //   }
    // );
  };


  $scope.tinymceOptions = {
  // General options
  selector:'textarea',
  mode : "exact",
  elements : "wysiwygEditor",
  themes : "modern",
  language: 'ru',
  height: 400,
  plugins : "image,pagebreak,layer,table,save,advlist,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,template",
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
};


// function DeletePostCtrl($scope, $http, $location, News, $routeParams) {
//   var doNews = News.get({id: $routeParams.id});
//   // doNews.$delete;
//     // $scope.post = data;
//   };

  // $http.get('/api/post/' + $routeParams.id).
  // success(function(data) {
  //   $scope.post = data.post;
  // });
  // $scope.deletePost = function () {
  //   $http.delete('/api/post/' + $routeParams.id).
  //   success(function(data) {
  //     $location.url('/');
  //   });
  // };
  // $scope.home = function () {
  //   $location.url('/');
  // };
// }
//   News.get({id: $routeParams.id}, function(data){
//     $scope.post = data;
//   });
  // Documents.get({id: $routeParams.id}, function(data){
  //   $scope.form = data;

  // $scope.users = Users.query();
  // $scope.categories = Categories.query();
  // $scope.goverments = Goverments.query();

  // $scope.status = {
  //   isFirstOpen: true,
  //   oneAtATime: true,
  //   isItemOpen: [true]
  // };

  // $scope.users_group = [
  // {id: 0, name: "гость"},{id: 1, name: "пользователь"},{id: 2, name: "модератор"},{id: 3, name: "администратор"}
  // ];

  // $scope.user =[];

  // $log.info('-----admin panel controller---------------');
  // $log.info($scope.goverments);

  // $scope.saveUser = function(user) {
  //   // $log.info(user.id);
  //   // $scope.$apply(function(){
  //     var groupObject = user.group;
  //     user.group = groupObject.id;
  //     $log.info(user);
  //   // user.group = groupObject;
  //   $log.info('выбранная группа: ', user.group);
  //   user.group = groupObject;
  //   // })
  // }
  // // функция сохранения обращения
  // $scope.editGoverment = function (ogv_id) {
  //   // ngDialog.open({ template: 'popupTmpl.html', className: 'ngdialog-theme-default' });
  //   $log.info("delete!", ogv_id);
  // };
  // $scope.showForm = true;
  // $log.info("click!", ogv_id);



