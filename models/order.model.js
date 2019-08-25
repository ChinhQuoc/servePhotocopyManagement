var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    dateCreate:{
        type: Date
    },
    dateRent: {
        type: Date,
        required: true
    },
    dateGet: {
        type: Date,
        required: true
    },
    pageTotal: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    priceTotal: {
        type: Number,
    },
    note:{
        type: String,
    },
    document:{
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Chưa xử lý"
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

var order = mongoose.model('order', orderSchema);

module.exports = order;