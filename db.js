var mongoose = require("mongoose");
// var MongoClient = require("mongodb").MongoClient;
// var autoIncrement = require("mongodb-autoincrement");
mongoose.Promise = global.Promise;
// kết nối với db
var url = 'mongodb://localhost:27017/photocopy';
var con = mongoose.connect(url, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log('err: ' + err);
    } else {
        console.log("Successfuly conected", url);
    }
});

module.exports = con;