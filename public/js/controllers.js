// Контроллеры

// главная страница
function IndexCtrl($rootScope, $scope, $http, modalService, $log) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
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

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
    success(function(data) {
      $location.path('/');
    });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.post = data.post;
  });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.form = data.post;
  });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
    success(function(data) {
      $location.url('/readPost/' + $routeParams.id);
    });
  };
}

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