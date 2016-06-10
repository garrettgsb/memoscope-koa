const koa = require('koa');
const koaRouter = require('koa-router');
const koaErrorHandler = require('koa-error-handler');


const app = koa();
const router = koaRouter();
const fs = require('fs');

//Loads static HTML pages
var loadStatic = function(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

//INCLUDE PUG STUFF
const Pug = require('koa-pug')
const pug = new Pug({
  viewPath: './views',
  debug: false,
  pretty: false,
  compileDebug: false,
  // locals: global_locals_for_all_pages,
  basedir: 'pugs',
  // helperPath: [
  //   'path/to/pug/helpers',
  //   { random: 'path/to/lib/random.js' },
  //   { _: require('lodash') }
  // ],
  app: app // equals to pug.use(app) and app.use(pug.middleware)
});
// END PUG STUFF

router.get('/', function *(){
  this.body = yield loadStatic(__dirname + '/static_html/index.html');
});

//Rendered with Pug
router.get('/dashboard', function *(){
  this.render('dashboard')
});
router.get('/cards', function *(){
  this.render('cards')
});
router.get('/cards/new', function *(){
  this.render('cards_new')
});
router.get('/notification', function *(){
  this.body = yield loadStatic(__dirname + '/static_html/notification.html');
});
router.get('/user/decks', function *(){
  this.body = yield loadStatic(__dirname + '/static_html/user-decks.html');
});

koaErrorHandler(app);

//Middleware Stack
// app.use(function* capitalistPigs(next)
// {
//   console.log('1')
//   yield next;
//   console.log('4', this.body);
//   this.body = this.body.toUpperCase();
// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
