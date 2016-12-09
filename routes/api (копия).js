// var gm              = require('gm');
// var fs              = require('fs');
//========================================================
var Menu = require('./models/Menu.js');
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
// GET
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
        body: data.body
      };
    });
      res.json(news); // return all documents in JSON format
    });
};

// exports.posts = function (req, res) {
//   var posts = [];
//   data.posts.forEach(function (post, i) {
//     posts.push({
//       id: i,
//       title: post.title,
//       image: post.image,
//       text: post.text.substr(0, 600) + '...'
//     });
//   });
//   res.json({
//     posts: posts
//   });
// };
// GET ONE
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
// exports.addMenu = function (req, res) {
//   var MenuItem = new Menu(req.body);
//   console.log(req.body);
//   MenuItem.save((err) => {
//     console.log(MenuItem);
//     if(err) {
//       console.log(err);
//       res(err);
//     }
//     res.json(MenuItem);
//   });
// };

// exports.addMenuChildren = ((req, res) => {
//   var id = req.params.id;
//   console.log('id +++ ', id);
//   console.log('body +++ ', req.body);
//   var MenuItem = new Menu(req.body);
//   console.log('item +++ ', MenuItem);
//   Menu.findOne({ _id : id }, (err, parentMenuItem) => {
//     if(err) {
//       res.send(err)
//     }
//     parentMenuItem.toObject();
//     parentMenuItem.children.push(MenuItem);
//     parentMenuItem.save((error) => {
//       if(error) {
//         console.log(error);
//         res.send(error)
//       }
//       res.json(parentMenuItem);
//     });
//   });
// });

// function getMenu(url) {
//   return new Promise((resolve, reject) => {
//     Menu.find((error, MenuItems) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(MenuItems);
//     });
//   });
// };

// function mapMenuItem(item) {
//   // return new Promise((resolve, reject) => {
//     var html = '';
//     html += '<li> class="menu-open_li"';
//     html += '<a href="' + item.url + '" class="menu-open_link">' + item.title + '</a></li>';
//     return html;
// };

// exports.listMenu = ((req, res) => {
//   getMenu().then(
//     result => {
//       var html = '';
//       result.forEach((item, i) => {
//         html += mapMenuItem(item);
//       });
//       console.log(html);
//       res.send(html);
//     },
//     error => {
//       res.send(error)
//     }
//   );
// });

// exports.listMenu = ((req, res) => {
//   var html = '<ul> class="menu-open" ';
//   Menu.find((error, MenuItems) => {
//     MenuItems.forEach((item, i, array) =>{
//       html += '<li> class="menu-open_li';
//       console.log(i);
//       if(item.children.length > 0) {
//         html += ' menu-open_li_dropdown" ';
//         html += '<a> href="' + item.title + '" class="menu-open_link">' + item.title + '</a>';
//           // ul.menu-open_dropdown_menu
//         // item.children.forEach((it, i, array) => {
//         //   console.log(it);
//         //   html += ' menu-open_li_dropdown" ' + item.children[0].title;
//         // })
//         // console.log(item, 'children yes');
//       } else {
//         html += '" <a> href="' + item.url + '", class="menu-open_link"' + item.title + '</a></li>';
//       };
//       console.log(html);
//     });
//     html += '</ul>';
//     // console.log(MenuItems);
//   });
//   res.json('success');
// });