// Контроллеры
// главная страница
function IndexGaleriesCtrl($rootScope, $scope, $http, News, modalService, $log) {
  $scope.posts = News.query();
  $log.info($scope.posts);
};