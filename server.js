// modules =================================================
  var express         = require('express');
  var favicon         = require('serve-favicon');
  var app             = express();
  var mongoose        = require('mongoose');
  var bodyParser      = require('body-parser');
  var methodOverride  = require('method-override');
  var morgan          = require('morgan');
  var multipart       = require('connect-multiparty');
  var errorHandler    = require('errorhandler');

  var routes        = require('./routes');
  var news          = require('./routes/api.news');
  var galleries     = require('./routes/api.galleries');
  var usefuls       = require('./routes/api.usefuls');
  var legislations  = require('./routes/api.legislations.js');
  var goottoknows   = require('./routes/api.goottoknows.js');
  var portaldevs    = require('./routes/api.portaldevs.js');

  var http   = require('http');
  var path   = require('path');

// configuration ===========================================
  var db = require('./config/db');
  mongoose.Promise = global.Promise; // remove warning DeprecationWarning: Mongoose: mpromise ...
  mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// all environments
  app.set('port', process.env.PORT || 3020);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(favicon(__dirname + '/public/img/26.ico'));

  app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                         // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                     // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(bodyParser.json({ uploadDir: 'public/uploads' }));
  app.use(multipart({uploadDir: 'public/uploads'}));
  app.use(methodOverride());

  var env = process.env.NODE_ENV || 'development';
// development only
  if (env === 'development') {
    app.use(errorHandler());
  }
// production only
  if (env === 'production') {
    // TODO
  }

// Routes ==================================================
  app.get('/', routes.index);
  app.get('/partials/:name', routes.partials);

// JSON API

  app.post('/upload', news.upload);
  // app.post('/api/menu', api.addMenu);
  // app.put('/api/menuchildren/:id', api.addMenuChildren);
  // app.get('/api/menu', api.listMenu);
  // НОВОСТИ
  app.get('/api/posts', news.list);
  app.get('/api/posts/:id', news.get);
  app.post('/api/posts', news.add);
  app.put('/api/posts/:id', news.edit);
  app.delete('/api/posts/:id', news.delete);
  // ГАЛЕРЕЯ
  app.get('/api/galleries', galleries.list);
  app.get('/api/galleries/:id', galleries.get);
  app.post('/api/galleries', galleries.add);
  app.put('/api/galleries/:id', galleries.edit);
  app.delete('/api/galleries/:id', galleries.delete);
  //СОВЕТЫ
  app.get('/api/usefuls', usefuls.list);
  app.get('/api/usefuls/:id', usefuls.get);
  app.post('/api/usefuls', usefuls.add);
  app.put('/api/usefuls/:id', usefuls.edit);
  app.delete('/api/usefuls/:id', usefuls.delete);
  // изменения в законодательстве
  app.get('/api/legislations', legislations.list);
  app.get('/api/legislations/:id', legislations.get);
  app.post('/api/legislations', legislations.add);
  app.put('/api/legislations/:id', legislations.edit);
  app.delete('/api/legislations/:id', legislations.delete);

  app.get('/api/legislations', legislations.list);
  app.get('/api/legislations/:id', legislations.get);
  app.post('/api/legislations', legislations.add);
  app.put('/api/legislations/:id', legislations.edit);
  app.delete('/api/legislations/:id', legislations.delete);

  app.get('/api/goottoknows', goottoknows.list);
  app.get('/api/goottoknows/:id', goottoknows.get);
  app.post('/api/goottoknows', goottoknows.add);
  app.put('/api/goottoknows/:id', goottoknows.edit);
  app.delete('/api/goottoknows/:id', goottoknows.delete);

  app.get('/api/portaldevs', portaldevs.list);
  app.get('/api/portaldevs/:id', portaldevs.get);
  app.post('/api/portaldevs', portaldevs.add);
  app.put('/api/portaldevs/:id', portaldevs.edit);
  app.delete('/api/portaldevs/:id', portaldevs.delete);

  // ЛЮБОЙ, НЕ СУЩЕСТВУЮЩИЙ
  app.get('*', routes.index);

// Start Server =============================================

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
