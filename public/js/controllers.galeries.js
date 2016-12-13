// Контроллеры
// главная страница
function IndexGaleriesCtrl($rootScope, $scope, $http, Galeries, $location, $log) {
    $scope.posts = Galeries.query();
    $log.info($scope.posts);

    $scope.addGaleries = function(){
        $location.url('/addGaleries');
    };
};

// добавление новости
function AddGaleriesCtrl($scope, $location, $routeParams, Galeries, $timeout, $log) {
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