var user = require('../models/user.model');
var comment = require('../models/comment.model');
var order = require('../models/order.model');
module.exports = {
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,

    updateStore: updateStore,
    updateComment: updateComment,
    updateOrder: updateOrder
}

function getUserById(id) {
    return new Promise((res, rej) => {
        user.findOne({ _id: id }).exec((err, userData) => {
            if (err) {
                rej(err);
            } else {
                if (!userData) {
                    rej({
                        statusCode: 400,
                        message: "Không  có User này!"
                    })
                } else {
                    res(userData);
                }
            }
        });
    });
}

function updateUser(id, userData) {
    return user.findByIdAndUpdate(id, userData);
}

function deleteUser(id) {
    return new Promise((res, rej) => {
        user.find({ _id: id }).exec((err, userData) => {
            if (err) {
                rej(err);
            } else {
                if (!userData) {
                    rej({
                        statusCode: 400,
                        message: "Lỗi xóa tài khoản! không có tài khoản này"
                    });
                } else {
                    user.remove({
                        _id: id
                    }).exec((err, response) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                message: "Xóa tài khoản thành công"
                            });
                        }
                    });
                }
            }
        });
    });
}

function updateStore(id, storeData){
    return store.findByIdAndUpdate(id, storeData);
}

function updateComment(id, commentData){
    return comment.findByIdAndUpdate(id, commentData);
}

function updateOrder(id, orderData){
    return order.findByIdAndUpdate(id, orderData);
}
