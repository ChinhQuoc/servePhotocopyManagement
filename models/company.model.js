var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Công ty shipper
var companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    delivery: {
        type: Number,
    },
    email: {
        type: String,
        unique: true
    },
    adress:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    shipper: [{
        type: Schema.Types.ObjectId,
        ref: 'shipper'
    }]
});

var company = mongoose.model('company', companySchema);

module.exports = company;