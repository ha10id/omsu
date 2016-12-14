// Контроллеры
// главная страница
function IndexUsefulsCtrl($rootScope, $scope, $http, Usefuls, $location, $log) {
    $scope.posts = Usefuls.query();
    $log.info($scope.posts);

    $scope.add = function(){
        $location.url('/addUsefuls');
    };
};
// добавление документа
function AddUsefulsCtrl($scope, $location, $routeParams, Usefuls, $timeout, $log) {
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
        var newItem = new Usefuls($scope.form);
        console.log(newItem)
        newItem.$save().then(
            function (data) {
                $log.info("новость сохранена");
                // $log.debug(data);
                $location.url('/usefuls');
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
function ReadUsefulsCtrl($scope, $http, Usefuls, $routeParams) {
    Usefuls.get({id: $routeParams.id}, function(data){
        $scope.post = data;
    });
};
// редактирование документа
function EditUsefulsCtrl($scope, $location, Usefuls, $routeParams, $log) {
    $scope.form = {};
    'use strict';
    var usefuls = Usefuls.get({id: $routeParams.id}, function(data){
        $scope.tinymceModel = data.body;
        $scope.title = data.title;
        $log.info(data);
    });
    $scope.commitDocument = function() {
        console.log('Editor content:', $scope.tinymceModel);
        usefuls.body = $scope.tinymceModel;
        usefuls.title = $scope.title;
        Usefuls.update({id: $routeParams.id}, usefuls,
          function (data) {
            $log.info("новость сохранена");
            $location.url('/usefuls');
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
        $log.info('новость: ', usefuls);
        let result = Usefuls.remove({id: $routeParams.id});
        console.log(result)
        $location.url('/usefuls');
    };
};