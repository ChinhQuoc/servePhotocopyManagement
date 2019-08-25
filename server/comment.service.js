var comment = require('../models/comment.model');
var user = require('../models/user.model');
var product = require('../models/product.model');

module.exports = {
    getCommentById: getCommentById,
    updateComment: updateComment,
    deleteComment: deleteComment,

    updateUser: updateUser,
    updateProduct: updateProduct,
    getCommentByProduct: getCommentByProduct
}

function getCommentById(id) {
    return new Promise((res, rej) => {
        comment.findOne({ _id: id }).exec((err, commentData) => {
            if (err) {
                rej(err);
            } else {
                if (!commentData) {
                    rej({
                        statusCode: 400,
                        message: "Không có comment này!"
                        // message: err.message
                    })
                } else {
                    res(commentData);
                }
            }
        });
    });
}

function updateComment(id, commentData) {
    return comment.findByIdAndUpdate(id, commentData);
}

function deleteComment(id) {
    return new Promise((res, rej) => {
        comment.find({ _id: id }).exec((err, commentData) => {
            if (err) {
                rej(err);
            } else {
                if (!commentData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa comment! không có comment này"
                    });
                } else {
                    comment.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa comment thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateUser(id, userData) {
    return user.findByIdAndUpdate(id, userData);
}

function updateProduct(id, productData) {
    return product.findByIdAndUpdate(id, productData);
}

function getCommentByProduct(id) {
    return new Promise((res, rej) => {
        product.findById(id).populate('comment').exec(function(err, commentData) {
            if (err) {
                rej(err);
            } else {
                if (!commentData) {
                    rej({
                        statusCode: 400,
                        message: 'Không có product này'
                    })
                } else {
                    res(commentData)
                }
            }

        })

    });
}