var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    like: {
        type: Boolean,
        default: false
    },
    cmt: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});


var comment = mongoose.model('comment', commentSchema);
module.exports = comment;