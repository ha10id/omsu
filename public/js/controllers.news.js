// Контроллеры
// главная страница
function IndexNewsCtrl($rootScope, $scope, $http, News, modalService, $log) {
  // $http.get('/api/posts').
  //   success(function(data, status, headers, config) {
  //     $scope.posts = data.posts;
  //   });
  // // $scope.posts = News.query();
  $scope.isAdmin = $rootScope.isAdmin;
  $scope.posts = News.query();
  $log.info($scope.posts);
  $rootScope.showMenu = function() {
    $log.info('click!');
    alert('click!');
  };

  $scope.format = 'yyyy/MM/dd';
  $scope.dt = new Date();
  $scope.showWeeks = false;
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
  // показываем диалог комментария
  $rootScope.showDialog = function () {
    $log.info('show Dialog');
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
}

function ReadPostCtrl($scope, $http, News, $routeParams) {
  News.get({id: $routeParams.id}, function(data){
    $scope.post = data;
  });
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
  // настройки TinyMCE
  $scope.tinymceOptions = {
    plugins: 'link image code print preview',
    language: 'ru',
    height: 400,
    themes: "modern",
    imageupload_url: 'uploads/',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
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

function EditPostCtrl($scope, $http, $location, News, $routeParams, $log) {
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
        $location.url('/readPost/' + $routeParams.id);
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

  // настройки TinyMCE
  $scope.tinymceOptions = {
    selector:'textarea',

    // plugins: 'link image code print preview safari, pagebreak, style, layer, table, save, advhr, advimage, advlink, emotions, iespell, inlinepopups, insertdatetime, preview, media, searchreplace, print, contextmenu, paste, directionality, fullscreen, noneditable, visualchars, nonbreaking, xhtmlxtras, template',
    plugins: 'link image code print preview',
    editor_selector : "tiny",
    toolbar: 'fontsizeselect',
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    language: 'ru',
    height: 200,
    themes: "modern",
    imageupload_url: 'uploads/',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | insertfile link image',
    file_browser_callback: function(field_name, url, type, win) {
      if(type=='image') $('#my_form input').click();
    }
  };
};


function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.post = data.post;
  });
  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
    success(function(data) {
      $location.url('/');
    });
  };
  $scope.home = function () {
    $location.url('/');
  };
}

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



