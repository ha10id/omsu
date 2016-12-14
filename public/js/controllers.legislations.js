// Контроллеры
// главная страница
function IndexLegislationsCtrl($rootScope, $scope, $http, Legislations, $location, $log) {
    $scope.posts = Legislations.query();
    $log.info($scope.posts);

    $scope.add = function(){
        $location.url('/addLegislations');
    };
};
// добавление документа
function AddLegislationsCtrl($scope, $location, $routeParams, Legislations, $timeout, $log) {
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
        var newItem = new Legislations($scope.form);
        console.log(newItem)
        newItem.$save().then(
            function (data) {
                $log.info("новость сохранена");
                // $log.debug(data);
                $location.url('/Legislations');
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
function ReadLegislationsCtrl($scope, $http, Legislations, $routeParams) {
    Legislations.get({id: $routeParams.id}, function(data){
        $scope.post = data;
    });
};
// редактирование документа
function EditLegislationsCtrl($scope, $location, Legislations, $routeParams, $log) {
    $scope.form = {};
    'use strict';
    var legislations = Legislations.get({id: $routeParams.id}, function(data){
        $scope.tinymceModel = data.body;
        $scope.title = data.title;
        $log.info(data);
    });
    $scope.commitDocument = function() {
        console.log('Editor content:', $scope.tinymceModel);
        legislations.body = $scope.tinymceModel;
        legislations.title = $scope.title;
        Legislations.update({id: $routeParams.id}, legislations,
          function (data) {
            $log.info("новость сохранена");
            $location.url('/legislations/');
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