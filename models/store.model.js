var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    storeName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    image:{
        type: String
    },
    adress:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

var store = mongoose.model('store', storeSchema);

module.exports = store;