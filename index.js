var express = require('express'),
    http = require('http'),
    path = require('path'),
    readdirrsync = require('readdirrsync'),
    stylus = require('stylus'),
    app = express();
require('colors');

// environments
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(process.cwd(), 'source'));
  app.set('view engine', 'jade');
  app.use('/css', stylus.middleware({
    src: path.join(process.cwd(), '/source/stylus'),
    dest: path.join(process.cwd(), '/source/css'),
    debug: true,
    force: true
  }));
  app.use('/css', express.static(path.join(process.cwd(), 'source/css')));
  app.use('/img', express.static(path.join(process.cwd(), 'source/img')));
  app.use('/js', express.static(path.join(process.cwd(), 'source/js')));
});

function fjade (path) {
  if (path.match(/.jade/)) {
    return true;
  } else {
    return false;
  }
}

function jtrim (path) {
  var a = path.split('/');
  return a[a.length-1];
}

function buildRouting (view) {
  var route = view.replace(/.jade/, '');
  if (route === 'index') {
    route = '';
  } else if (route === 'layout') {
    return;
  }
  app.get('/'+route, function (req, res) {
    res.render(view, {});
  });
}

module.exports = function () {
  // read the source dir for *.jade files and build the routing
  var structure = readdirrsync(process.cwd()+'/source');
  structure.filter(fjade).map(jtrim).forEach(buildRouting);

  http.createServer(app).listen(app.get('port'), function () {

    console.log('    (   ) ('.grey);
    console.log('     ) _   )'.grey);
    console.log('      ( \\_'.grey);
    console.log('    _(_\\ \\)__'.grey);
    console.log('   (____\\___))'.grey);
    console.log('get the shit done server is listening on port', app.get('port'));
  });
};
