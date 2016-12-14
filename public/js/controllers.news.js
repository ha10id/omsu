// Контроллеры
// главная страница
function IndexNewsCtrl($rootScope, $scope, $http, News, $location, $log) {
  $scope.posts = News.query();
  $log.info($scope.posts);

  $scope.add = function(){
    $location.url('/addNews');
  };
};
// просмотр документа
function ReadPostCtrl($scope, $http, News, $routeParams) {
  News.get({id: $routeParams.id}, function(data){
    $scope.post = data;
  });
}
// добавление документа
function AddNewsCtrl($scope, $location, $routeParams, News, $timeout, $log) {
  'use strict';
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
      });
  };
}
// редактирование документа
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
  // удаление документа
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
};
