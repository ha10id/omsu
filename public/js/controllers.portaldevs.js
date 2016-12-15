// Контроллеры
// главная страница
function IndexPortalDevCtrl($rootScope, $scope, $http, PortalDevs, $location, $log) {
    $scope.posts = PortalDevs.query();
    $log.info($scope.posts);

    $scope.add = function(){
        $location.url('/addPortalDev');
    };
};
// добавление документа
function AddPortalDevCtrl($scope, $location, $routeParams, PortalDevs, $timeout, $log) {
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
        var newItem = new PortalDevs($scope.form);
        console.log(newItem)
        newItem.$save().then(
            function (data) {
                $log.info("новость сохранена");
                // $log.debug(data);
                $location.url('/portaldev');
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
function ReadPortalDevCtrl($scope, $http, PortalDevs, $routeParams) {
    PortalDevs.get({id: $routeParams.id}, function(data){
        $scope.post = data;
    });
};
// редактирование документа
function EditPortalDevCtrl($scope, $location, PortalDevs, $routeParams, $log) {
    $scope.form = {};
    'use strict';
    var portaldev = PortalDevs.get({id: $routeParams.id}, function(data){
        $scope.tinymceModel = data.body;
        $scope.title = data.title;
        $log.info(data);
    });
    $scope.commitDocument = function() {
        console.log('Editor content:', $scope.tinymceModel);
        portaldev.body = $scope.tinymceModel;
        portaldev.title = $scope.title;
        PortalDevs.update({id: $routeParams.id}, portaldev,
          function (data) {
            $log.info("новость сохранена");
            $location.url('/portaldev');
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
        $log.info('новость: ', portaldev);
        let result = PortalDevs.remove({id: $routeParams.id});
        console.log(result)
        $location.url('/portaldev');
    };
};