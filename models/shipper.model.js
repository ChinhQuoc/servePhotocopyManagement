var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    avatar:{
        type: String
    },
    // order: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'order'
    // }],
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    }
});

var shipper = mongoose.model('shipper', storeSchema);

module.exports = shipper;