var gm              = require('gm');
var fs              = require('fs');
//========================================================
var Galleries = require('./models/Galleries.js');
// генерация уникального ID
var ID = function () {
  'use strict';
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

// НОВОСТИ
//========================================================
// GET LIST
// Documents
// список документов +
exports.list = function (req, res) {
  'use strict';
  Galleries.find(function(err, response) {
    if (err) {
      res.send(err);
    }
    response = response.map(function(data) {
      return {
        id: data.id,
        title: data.title,
        publication_date: data.publication_date,
        creation_date: data.creation_date,
        body: data.body
      };
    });
      res.json(response); // return all documents in JSON format
    }).sort({publication_date: -1});
};

// обновление документа
exports.edit = function (req, res) {
  'use strict';
  // if (req.session.authorized) {
    var id = req.params.id;
    console.log("-----------------------------------------");
    console.log("обновление: ", id, "\n");
    // console.log('session.currentUser: ', req.session.currentUser);
    // console.log('session.isadmin: ', req.session.isadmin);
    // console.dir('request.body: ', req.body);

    Galleries.findOne({ _id : id }, function(err, response) {
      if (err) {
        res.send(false);
      }
      // изменяем поля
      response.title = req.body.title;
      response.body = req.body.body;
      // news.category = req.body.category;
      // news.longitude = req.body.longitude;
      // news.latitude = req.body.latitude;
      // news.address = req.body.address;
      // news.status = req.body.status;
      // news.nomer = req.body.nomer;
      // news.region = req.body.region;
      // news.mynomer = req.body.mynomer;
      // dnewsocument.myregion = req.body.myregion;

      // document.name = req.session.user;
      // if ((document._creator == req.session.currentUser._id) || (req.session.isadmin == true) || (req.session.ismoderator == true)) {
        // сохраняем отредактированный документ
        // console.log(news);
        response.save(function(err) {
          if (err) {
            res.send(false);
          }
          res.json(true);
        });
      // } else {
      //   res.sendStatus(403); // запрещено
      // }
    });
  // } else {
  //   res.sendStatus(401); // не авторизован
  // }
};
// получить документ по ID +
exports.get = function (req, res) {
  'use strict';
  var id = req.params.id;
  console.log("-----------------------------------------");
  console.log('api get news :', id);
  Galleries.findOne({ _id : id }, function(err, response) {
    if (err) {
      res.send(err);
    }
    // console.log(news);
    res.json(response);
  });
};
// POST
// добавление документа
exports.add = function (req, res) {
  'use strict';
  // data.posts.push(req.body);
    // console.log("-----------------------------------------");
    console.log("создание новости: \n");

  // if (req.session.authorized) {
    // заполняем поля статуса и даты создания документа
    // req.body.status = 0;
    // req.body._creator = req.session.currentUser._id;
    // if (req.body.name === undefined) {
    //   req.body.name = req.session.currentUser.name;
    // };
    // req.body.datestamp = new Date();
    // новый объект
    var newItem = new Galleries(req.body);
    // пробуем записать
    newItem.save(function(err) {
      // console.log(newNews);
      var data = newItem.toObject();
      data.id = data._id;
      if (err) {
        res.send(err);
      }
      res.json(data);
    });
  // } else {
  //   res.sendStatus(401);
  //}
};
// // DELETE
exports.delete = function (req, res) {
  var id = req.params.id;
  Galleries.remove({_id: id}, function(err, data){
    if (err) {
      res.json(false);
    }
    console.log(data);
    res.json(true);
  }).exec();
};

// загрузка картинок в массив и на сервер
exports.upload = function (req, res, next) {
  'use strict';
  console.log(req);
  console.log(req.files.image.path);
  console.log(req.files.image.name);
  var realFileName = req.files.image.path;
  // realFileName = realFileName.replace(/public\//g, '');
  console.log(realFileName)
  var fileName = req.files.image.name;
  console.log("-----------------------------------------");
  console.log("загузка изображения", "\n");
  // console.log(form);
  // var file = req.files.image.path;
  // console.log("имя файла: ", file.name); //original name (ie: sunset.png)
  // // console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  // // console.log(file.type); //tmp path (ie: /tmp/12345-xyaz.png)
  // // console.log(req.body.document_id);
  // var tmp_path = file;
  // // формируем уникальное имя для файла
  // var fileName = ID();
  var target_path = 'public/uploads/tmp/' + fileName;
  fs.renameSync(realFileName, target_path, function(err) {
     if (err) {
       console.error(err.stack);
     }
   });
  // console.log( tmp_path, target_path );
  // уменьшим картинку
  gm(target_path)
  .resize(800, 600, "!")
  .noProfile()
  .write('public/uploads/' + fileName, function(err) {
    if (err) {
      console.error(err.stack);
    } else {
      fs.unlink(target_path, (err) => {
        if (err) throw err;
        console.log('файл удалён ', target_path);
      });
    }
  });

  console.log("имя файла на запись: ", fileName);
  // res.toString({fileName});
  res.send("<script>top.$('.mce-btn.mce-open').parent().find('.mce-textbox').val('../../uploads/" + fileName + "').closest('.mce-window').find('.mce-primary').click();</script>")
};