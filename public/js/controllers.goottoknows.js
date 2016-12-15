// Контроллеры
// главная страница
function IndexGootToKnowsCtrl($rootScope, $scope, $http, GootToKnows, $location, $log) {
    $scope.posts = GootToKnows.query();
    $log.info($scope.posts);

    $scope.add = function(){
        $location.url('/addGootToKnows');
    };
};
// добавление документа
function AddGootToKnowsCtrl($scope, $location, $routeParams, GootToKnows, $timeout, $log) {
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
        var newItem = new GootToKnows($scope.form);
        console.log(newItem)
        newItem.$save().then(
            function (data) {
                $log.info("новость сохранена");
                // $log.debug(data);
                $location.url('/gootToKnows');
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
function ReadGootToKnowsCtrl($scope, $http, GootToKnows, $routeParams) {
    GootToKnows.get({id: $routeParams.id}, function(data){
        $scope.post = data;
    });
};
// редактирование документа
function EditGootToKnowsCtrl($scope, $location, GootToKnows, $routeParams, $log) {
    $scope.form = {};
    'use strict';
    var newItem = GootToKnows.get({id: $routeParams.id}, function(data){
        $scope.tinymceModel = data.body;
        $scope.title = data.title;
        $log.info(data);
    });
    $scope.commitDocument = function() {
        console.log('Editor content:', $scope.tinymceModel);
        newItem.body = $scope.tinymceModel;
        newItem.title = $scope.title;
        GootToKnows.update({id: $routeParams.id}, newItem,
          function (data) {
            $log.info("новость сохранена");
            $location.url('/gootToKnows');
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
        $log.info('новость: ', newItem);
        let result = GootToKnows.remove({id: $routeParams.id});
        console.log(result)
        $location.url('/usefuls');
    };
};