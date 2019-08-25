var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Đăng ký chia sẻ máy
var registerRentSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
    },
    isDelete:{
        type: Boolean,
        default: false
    },

    product:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});

var registerRent= mongoose.model('registerRent', registerRentSchema);

module.exports = registerRent;