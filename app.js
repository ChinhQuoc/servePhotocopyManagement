var db = require("./db");
var express = require("express");

var authRouters = require('./routes/auth.route');
var userRouters = require('./routes/user.route');
var storeRouters = require('./routes/store.route');
var productRouters = require('./routes/product.route');
var companyRouters = require('./routes/company.route');
var shipperRouters = require('./routes/shipper.route');
var commentRouters = require('./routes/comment.route');
var orderRouters = require('./routes/order.route');
var registerRentRouters = require('./routes/registerRent.route');

const bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 3000; // process.env là 1 object chưa tất cả các thông tin về môi trường mà nodejs đang chạy

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
jsonwebtoken = require("jsonwebtoken");
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
app.use('/', userRouters());
app.use('/', authRouters());
app.use('/', storeRouters());
app.use('/', productRouters());
app.use('/', companyRouters());
app.use('/', shipperRouters());
app.use('/', commentRouters());
app.use('/', orderRouters());
app.use('/', registerRentRouters());

app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});

app.get("/", (req, res) => {
    res.send("listening on " + PORT);
});