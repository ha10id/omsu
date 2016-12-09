var gm              = require('gm');
var fs              = require('fs');
//========================================================
var News = require('./models/News.js');
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
  News.find(function(err, news) {
    if (err) {
      res.send(err);
    }
    news = news.map(function(data) {
      return {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        publication_date: data.publication_date,
        body: data.body
      };
    });
      res.json(news); // return all documents in JSON format
    });
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
    console.dir('request.body: ', req.body);

    News.findOne({ _id : id }, function(err, news) {
      if (err) {
        res.send(false);
      }
      // изменяем поля
      news.title = req.body.title;
      news.body = req.body.body;
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
        console.log(news);
        news.save(function(err) {
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
  News.findOne({ _id : id }, function(err, news) {
    if (err) {
      res.send(err);
    }
    console.log(news);
    res.json(news); // return one document in JSON format
  });
};
// // POST
// exports.addPost = function (req, res) {
//   data.posts.push(req.body);
//   res.json(req.body);
// };
// // PUT
// exports.editPost = function (req, res) {
//   var id = req.params.id;

//   if (id >= 0 && id < data.posts.length) {
//     data.posts[id] = req.body;
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// };

// // DELETE
// exports.deletePost = function (req, res) {
//   var id = req.params.id;

//   if (id >= 0 && id < data.posts.length) {
//     data.posts.splice(id, 1);
//     res.json(true);
//   } else {
//     res.json(false);
//   }
// };
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