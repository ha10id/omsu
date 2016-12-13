// Контроллеры
// главная страница
function IndexGalleriesCtrl($rootScope, $scope, $http, Galleries, $location, $log) {
    $scope.posts = Galleries.query();
    $log.info($scope.posts);

    $scope.addGalleries = function(){
        $location.url('/addGalleries');
    };
};
// добавление документа
function AddGalleriesCtrl($scope, $location, $routeParams, Galleries, $timeout, $log) {
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
        var newItem = new Galleries($scope.form);
        console.log(newItem)
        newItem.$save().then(
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
};
// чтение документа
function ReadGalleriesCtrl($scope, $http, Galleries, $routeParams) {
    Galleries.get({id: $routeParams.id}, function(data){
        $scope.post = data;
    });
};
// редактирование документа
function EditGalleriesCtrl($scope, $location, Galleries, $routeParams, $log) {
    $scope.form = {};
    'use strict';
    var galleries = Galleries.get({id: $routeParams.id}, function(data){
        $scope.tinymceModel = data.body;
        $scope.title = data.title;
        $log.info(data);
    });
    $scope.commitDocument = function() {
        console.log('Editor content:', $scope.tinymceModel);
        galleries.body = $scope.tinymceModel;
        galleries.title = $scope.title;
        Galleries.update({id: $routeParams.id}, galleries,
          function (data) {
            $log.info("новость сохранена");
            $location.url('/galleries/');
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
        $log.info('новость: ', galleries);
        let result = Galleries.remove({id: $routeParams.id});
        console.log(result)
        $location.url('/galleries');
    };
};