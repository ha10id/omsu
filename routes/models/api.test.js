var Menu = require('./models/Menu.js');


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

exports.listMenu = ((req, res) => {
  Menu.find((error, MenuItems) => {
      if (error) {
        reject(error);
      }
      resolve(MenuItems);
    });
  });
};
