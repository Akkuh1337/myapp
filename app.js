var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:634570rz@localhost:5432/kursa4')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientsRouter = require('./routes/clients');
var ordersRouter = require('./routes/orders');
var uordersRouter = require('./routes/uorders');
var suppliersRouter = require('./routes/suppliers');
var deliveryitemsRouter = require('./routes/delivery_items');
var productsRouter = require('./routes/products');
var uproductsRouter = require('./routes/uproducts');

var app = express();

session = require("./session.js")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);
app.use('/uorders', uordersRouter);
app.use('/suppliers', suppliersRouter);
app.use('/delivery_items', deliveryitemsRouter);
app.use('/products', productsRouter);
app.use('/uproducts', uproductsRouter);

var api = require('./routes/api');
app.use('/api', api);
var api_auth = require('./routes/api/auth');
api.use('/auth', api_auth);

var api_users = require('./routes/api/users');
api.use('/users', api_users);
var api_suppliers = require('./routes/api/suppliers');
api.use('/suppliers', api_suppliers);
var api_clients = require('./routes/api/clients');
api.use('/clients', api_clients);
var api_orders = require('./routes/api/orders');
api.use('/orders', api_orders);
var api_products = require('./routes/api/products');
api.use('/products', api_products);
var api_delivery_items = require('./routes/api/delivery_items');
api.use('/delivery_items', api_delivery_items);
var api_uproducts = require('./routes/api/uproducts');
api.use('/uproducts', api_uproducts);
var api_uorders = require('./routes/api/uorders');
api.use('/uorders', api_uorders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.one('SELECT $1 AS value', 123)
.then((data) => {
console.log('DATA:', data.value)
})
.catch((error) => {
console.log('ERROR:', error)
});

module.exports = app;