fs = require('fs');
var Menu = require('./models/Menu.js');

exports.menusList = function (req, res) {
	'use strict';
	Menu.find(function(err, response) {
		if (err) {
			res.send(err);
		}
    // response = response.map(function(data) {
    //   return {
    //     id: data.id,
    //     title: data.title,
    //     children: data.children
    //   };
    // });
    var html = '';
    html += "<ul class=\"menu-open\">"
    response.forEach(function(item, i, response) {
    	var child = item.children;
    	html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + item.url + "\" class=\"menu-open_link\">" + item.title + "</a>";
    	if (child.length > 0) {

    		html += "<ul class=\"menu-open_dropdown_menu\">";

    		for( var index=0, len = child.length; index < len; ++index) {
    			html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + child[index].url +"\" class=\"menu-open_link\">" + child[index].title + "</a>";
            // второй уровень
            var child2 = child[index].children;
            if (child2.length > 0) {
                html += "<ul class=\"menu-open_dropdown_menu\">";
                for( var index2=0, len2 = child2.length; index2 < len2; ++index2) {
                    html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + child2[index2].url +"\" class=\"menu-open_link\">" + child2[index2].title + "</a></li>";
                    } //for
                html += "</ul>"
                }
            } //for
		html += "</ul>"

    	}
    });
    html += "</ul>"
    console.log(html);
    res.json(response); // return all documents in JSON format
	});
};

//     var html = '';
//     html += "<ul class=\"menu-open\">"
//     response.forEach(function(item, i, response) {
//         var child = item.children;
//         html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + item.url + "\" class=\"menu-open_link\">" + item.title + "</a>";
//         if (child.length > 0) {

//             html += "<ul class=\"menu-open_dropdown_menu\">";

//             for( var index=0, len = child.length; index < len; ++index) {
//                 html += "<li class=\"menu-open_li menu-open_li_dropdown\"><a href=\"" + child[index].url +"\" class=\"menu-open_link\">" + child[index].title + "</a></li>";
//             }
//         html += "</ul>"

//         }
//     });
//     html += "</ul>"
//     console.log(html);
//     res.json(response); // return all documents in JSON format
//     });
// };