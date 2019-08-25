var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
    productName:{
        type: String,
        required: true
    },
    speed:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default:"Máy bận"
    },
    image: {
        type: String
    },

    isDelete:{
        type: Boolean,
        default: false
    },
    registerRent:[{
        type: Schema.Types.ObjectId,
        ref: 'registerRent'
    }],
    store:{
        type: Schema.Types.ObjectId,
        ref: 'store'
    },
    order:[{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    comment:[{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
});

var product= mongoose.model('product', productSchema);

module.exports = product;