var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
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
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    store: [{
        type: Schema.Types.ObjectId,
        ref: 'store'
    }],
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }]
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', userSchema);

module.exports = user;