// Контроллеры
// главная страница
function IndexNewsCtrl($rootScope, $scope, $http, News, modalService, $log) {
  $scope.posts = News.query();
  $log.info($scope.posts);
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
  // $scope.tinymceOptions = {
  //   plugins: 'link image code print preview',
  //   language: 'ru',
  //   height: 400,
  //   themes: "modern",
  //   relative_urls : false,
  //   convert_urls : false,
  //   remove_script_host : false,
  //   imageupload_url: 'uploads/',
  //   toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  // };
  $scope.tinymceOptions = {
  // General options
    mode : "exact",
    elements : "wysiwygEditor",
    theme : "advanced",
    skin : "o2k7",
                plugins : "imagemanager,filemanager,safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,flash",
                extended_valid_elements : 'script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],div[*],p[*],object[width|height|classid|codebase|embed|param],param[name|value],embed[param|src|type|width|height|flashvars|wmode]',
    media_strict: false,
                theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",
                theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,iespell,media,advhr,|,print,|,fullscreen",
                theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak,|,insertdate,inserttime,preview,|,forecolor,backcolor",
                theme_advanced_toolbar_location : "top",
                theme_advanced_toolbar_align : "left",
                theme_advanced_statusbar_location : "bottom",
                theme_advanced_resizing : true,
    relative_urls : "false",
    remove_script_host : false,
    convert_urls : false
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
      }
      );
  };

  $scope.tinymceOptions = {
  // General options
    selector:'textarea',
    mode : "exact",
    elements : "wysiwygEditor",
    themes : "modern",
    language: 'ru',
    height: 200,
    plugins : "imagetools,image,pagebreak,layer,table,save,advlist,emotions,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,template",
    extended_valid_elements : 'script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],div[*],p[*],object[width|height|classid|codebase|embed|param],param[name|value],embed[param|src|type|width|height|flashvars|wmode]',
    media_strict: false,
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "bottom",
    theme_advanced_resizing : true,
    relative_urls : false,
    convert_urls : false,
    file_browser_callback: function(field_name, url, type, win) {
      if(type=='image') $('#my_form input').click();
    }
  };
  // настройки TinyMCE
  // $scope.tinymceOptions = {
  //   selector:'textarea',

  //   // plugins: 'link image code print preview safari, pagebreak, style, layer, table, save, advhr, advimage, advlink, emotions, iespell, inlinepopups, insertdatetime, preview, media, searchreplace, print, contextmenu, paste, directionality, fullscreen, noneditable, visualchars, nonbreaking, xhtmlxtras, template',
  //   plugins: 'link image code print preview',
  //   editor_selector : "tiny",
  //   toolbar: 'fontsizeselect',
  //   fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
  //   language: 'ru',
  //   height: 200,
  //   themes: "modern",
  //   imageupload_url: 'uploads/',
  //   toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | insertfile link image',
  //   file_browser_callback: function(field_name, url, type, win) {
  //     if(type=='image') $('#my_form input').click();
  //   }
  // };
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



